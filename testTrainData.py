import numpy as np
import os
import time
from vgg16 import VGG16
from keras.preprocessing import image
from keras.applications.imagenet_utils import preprocess_input
from imagenet_utils import decode_predictions
from keras.layers import Dense, Activation, Flatten
from keras.layers import merge, Input
from keras.models import Model
from keras.utils import np_utils
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

# Example to see image shape
# img_path = 'elephant.jpg'
# # img = image.load_img(img_path, target_size=(224, 224))
# # x = image.img_to_array(img)
# # print (x.shape)
# # x = np.expand_dims(x, axis=0)
# # print (x.shape)
# # x = preprocess_input(x)
# # print('Input image shape:', x.shape)

# Loading the training data
PATH = os.getcwd()
# Define data path
data_path = PATH + '/Mens'
data_dir_list = os.listdir(data_path)

# Define a list and store all of the data
img_data_list=[]

for dataset in data_dir_list:
    img_list=os.listdir(data_path+'/'+ dataset)
    print ('Loaded the images of dataset-'+'{}\n'.format(dataset))
    for img in img_list:
        img_path = data_path + '/'+ dataset + '/'+ img
        img = image.load_img(img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        # x = x/255
        print('Input image shape:', x.shape)
        img_data_list.append(x)  # append all the images to the img_data_list

# Convert it to an array
img_data = np.array(img_data_list)
# img_data = img_data.astype('float32')
print (img_data.shape)  # (808, 1, 224, 224, 3) don't want in this format, want it (808, 224, 224, 3) format
img_data=np.rollaxis(img_data,1,0)
print (img_data.shape)  # now we get (1, 808, 224, 224, 3) so we get rid of the one
img_data=img_data[0]
print (img_data.shape)  # now we get (808, 224, 224, 3)


# Define the number of classes
num_classes = 12
num_of_samples = img_data.shape[0]
labels = np.ones((num_of_samples,),dtype='int64')

# assign level as 0, 1, 2, 3
labels[0:285]=0
labels[285:543]=1
labels[543:1203]=2
labels[1203:1510]=3
labels[1510:2229]=4
labels[2229:2638]=5
labels[2638:3013]=6
labels[3013:3328]=7
labels[3328:3748]=8
labels[3748:3833]=9
labels[3833:4399]=10
labels[4399:4758]=11

names = ['MBoots','MHoodies','MJackets','MJumpers', 'MRunners', 'MShirts', 'MShoes', 'MShorts', 'MSuit',
         'MTracksuitBottoms', 'MTrousers', 'MTshirt']

# convert class labels to on-hot encoding
Y = np_utils.to_categorical(labels, num_classes)

#Shuffle the dataset
x,y = shuffle(img_data,Y, random_state=2)
# Split the dataset 20% is test set
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=2)

#########################################################################################
# Custom_vgg_model_1
# Training the classifier alone
# Set input shape to (224, 224, 3)
image_input = Input(shape=(224, 224, 3))

# Call model, setting top to true
model = VGG16(input_tensor=image_input, include_top=True,weights='imagenet')
model.summary()

# We dont have 1000 classes, we only have 4 here so we should go to layer fc2 only
# model.get_layer('fc2'), we can use this to get to any layer
last_layer = model.get_layer('fc2').output
#x= Flatten(name='flatten')(last_layer)
# Here we add a layer over it
# Dense the nuber of classes (in this case 4), its a softmax activation layer in this case and we name it output
out = Dense(num_classes, activation='softmax', name='output')(last_layer)
# Here we make our own custom vgg model using this Keras model api
# Input is image_input and output is the layer we just defined, which is the layer with 4 classes
custom_vgg_model = Model(image_input, out)
custom_vgg_model.summary()

custom_vgg_model.compile(loss='categorical_crossentropy',optimizer='rmsprop',metrics=['accuracy'])

# We don't wanna train teh entire model, we only want to train last layer
# This loops through every layer except the last layer and we set trainable as false
# This will freeze the model
for layer in custom_vgg_model.layers[:-1]:
    layer.trainable = False

# Run to see if it is trainable - will return true if yes
custom_vgg_model.layers[3].trainable


t=time.time()
#	t = now()
hist = custom_vgg_model.fit(X_train, y_train, batch_size=32, epochs=15, verbose=1, validation_data=(X_test, y_test))
print('Training time: %s' % (t - time.time()))
(loss, accuracy) = custom_vgg_model.evaluate(X_test, y_test, batch_size=10, verbose=1)

print("[INFO] loss={:.4f}, accuracy: {:.4f}%".format(loss,accuracy * 100))


####################################################################################################################
# # Fine Tuning the model for datasets that are larger
# # Training the feature extraction also
#
# image_input = Input(shape=(224, 224, 3))
#
# model = VGG16(input_tensor=image_input, include_top=True,weights='imagenet')
#
# model.summary()
#
# # Setting block5_pool as the last layer from the model
# last_layer = model.get_layer('block5_pool').output
# # Then we flatten it as its a pooling layer
# x= Flatten(name='flatten')(last_layer)
# # Add a dense layer of 128 neurons, and then again
# x = Dense(128, activation='relu', name='fc1')(x)
# x = Dense(128, activation='relu', name='fc2')(x)
# # softmax layer with the number of neurons as the number of classes
# out = Dense(num_classes, activation='softmax', name='output')(x)
# # Define the model with Keras model functional api
# custom_vgg_model2 = Model(image_input, out)
# custom_vgg_model2.summary()
#
# # freeze all the layers except the dense layers
# for layer in custom_vgg_model2.layers[:-3]:
# 	layer.trainable = False
#
# custom_vgg_model2.summary()
#
# custom_vgg_model2.compile(loss='categorical_crossentropy',optimizer='adadelta',metrics=['accuracy'])
#
# t=time.time()
# #	t = now()
# hist = custom_vgg_model2.fit(X_train, y_train, batch_size=32, epochs=12, verbose=1, validation_data=(X_test, y_test))
# print('Training time: %s' % (t - time.time()))
# (loss, accuracy) = custom_vgg_model2.evaluate(X_test, y_test, batch_size=10, verbose=1)
#
# print("[INFO] loss={:.4f}, accuracy: {:.4f}%".format(loss,accuracy * 100))

#%%
import matplotlib.pyplot as plt
# visualizing losses and accuracy
train_loss=hist.history['loss']
val_loss=hist.history['val_loss']
train_acc=hist.history['acc']
val_acc=hist.history['val_acc']
xc=range(12)

plt.figure(1,figsize=(7,5))
plt.plot(xc,train_loss)
plt.plot(xc,val_loss)
plt.xlabel('num of Epochs')
plt.ylabel('loss')
plt.title('train_loss vs val_loss')
plt.grid(True)
plt.legend(['train','val'])
#print plt.style.available # use bmh, classic,ggplot for big pictures
plt.style.use(['classic'])

plt.figure(2,figsize=(7,5))
plt.plot(xc,train_acc)
plt.plot(xc,val_acc)
plt.xlabel('num of Epochs')
plt.ylabel('accuracy')
plt.title('train_acc vs val_acc')
plt.grid(True)
plt.legend(['train','val'],loc=4)
#print plt.style.available # use bmh, classic,ggplot for big pictures
plt.style.use(['classic'])

# %%
# Saving and loading model and weights

from keras.models import load_model

# Save model and load model
model.save('model.hdf5')
loaded_model = load_model('model.hdf5')
