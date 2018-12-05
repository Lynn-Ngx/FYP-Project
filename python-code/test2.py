# Link to tutorial that was followd https://www.youtube.com/watch?v=L7qjQu2ry2Q&t=0s&list=WL&index=20

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


# Loading the training data
PATH = os.getcwd()
# Define data path
data_path = PATH + '/clothesTest'
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
num_classes = 4
num_of_samples = img_data.shape[0]
labels = np.ones((num_of_samples,),dtype='int64')

labels[0:660] = 0
labels[660:1379] = 1
labels[1379:2023] = 2
labels[2023:2822] = 3

names = ['MJackets', 'MRunners', 'MTrousers', 'WDresses']

# convert class labels to on-hot encoding
Y = np_utils.to_categorical(labels, num_classes)

#Shuffle the dataset
x,y = shuffle(img_data,Y, random_state=2)
# Split the dataset 20% is test set
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=2)

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
# t = now()
hist = custom_vgg_model.fit(X_train, y_train, batch_size=32, epochs=15, verbose=1, validation_data=(X_test, y_test))

print('Training time: %s' % (t - time.time()))
(loss, accuracy) = custom_vgg_model.evaluate(X_test, y_test, batch_size=10, verbose=1)

print("[INFO] loss={:.4f}, accuracy: {:.4f}%".format(loss,accuracy * 100))

model.save('model1.hdf5')


from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from keras.applications.imagenet_utils import preprocess_input
from imagenet_utils import decode_predictions

loaded_model = load_model('model1.hdf5')
# loaded_model = VGG16(include_top=True, weights='imagenet')

img_path = 'shoe.jpg'
img = image.load_img(img_path, target_size=(224, 224))
# Convert to array
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)
print('Input image shape:', x.shape)

preds = loaded_model.predict(x)
print('Predicted:', decode_predictions(preds))

loaded_model.summary()
loaded_model.layers[-1].get_config()