import sys, os
import numpy as np
from keras.preprocessing import image
from keras.models import Model
# sys.path.append("src")

from vgg19 import VGG19
from imagenet_utils import preprocess_input
from plot import plot_query_answer
from sort import find_topk_unique
from KNN import kNN

def main():
    # Load pre-trained model and remove higher level layers
    print("Loading VGG19 pre-trained model...")
    base_model = VGG19(weights='imagenet')
    model = Model(inputs=base_model.input,
                  outputs=base_model.get_layer('block4_pool').output)

    # Read images and convert them to feature vectors
    imgs, filename_heads, X = [], [], []
    path = "./python-code2/Db1"
    print("Reading images from '{}' directory...\n".format(path))
    for f in os.listdir(path):

        # Process filename
        filename = os.path.splitext(f)  # filename in directory
        filename_full = os.path.join(path,f)  # full path filename
        head, ext = filename[0], filename[1]
        if ext.lower() not in [".jpg", ".jpeg"]:
            continue

        # Read image file
        img = image.load_img(filename_full, target_size=(224, 224))  # load
        imgs.append(np.array(img))  # image
        filename_heads.append(head)  # filename head

        # Pre-process for model input
        img = image.img_to_array(img)  # convert to array
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)
        features = model.predict(img).flatten()  # features
        X.append(features)  # append feature extractor


    X = np.array(X)  # feature vectors
    imgs = np.array(imgs)  # images
    print("imgs.shape = {}".format(imgs.shape))
    print("X_features.shape = {}\n".format(X.shape))

    # Find k-nearest images to each image
    n_neighbours = 3 + 1  # +1 as itself is most similar
    knn = kNN()  # kNN model
    knn.compile(n_neighbors=n_neighbours, algorithm="brute", metric="cosine")
    knn.fit(X)

    # Plot recommendations for each image in database
    output_rec_dir = os.path.join("output", "recommendations")
    if not os.path.exists(output_rec_dir):
        os.makedirs(output_rec_dir)
    n_imgs = len(imgs)
    ypixels, xpixels = imgs[0].shape[0], imgs[0].shape[1]
    for ind_query in range(n_imgs):

        # Find top-k closest image feature vectors to each vector
        print("[{}/{}] Plotting similar image recommendations for: {}".format(ind_query+1, n_imgs, filename_heads[ind_query]))
        distances, indices = knn.predict(np.array([X[ind_query]]))
        distances = distances.flatten()
        indices = indices.flatten()
        indices, distances = find_topk_unique(indices, distances, n_neighbours)
        # Plot recommendations
        rec_filename = os.path.join(output_rec_dir, "{}_rec.png".format(filename_heads[ind_query]))
        x_query_plot = imgs[ind_query].reshape((-1, ypixels, xpixels, 3))
        x_answer_plot = imgs[indices].reshape((-1, ypixels, xpixels, 3))
        plot_query_answer(x_query=x_query_plot,
                          x_answer=x_answer_plot[1:],  # remove itself
                          filename=rec_filename)
    return 'sucess!'

if __name__ == "__main__":
    main()