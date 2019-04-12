# Reference: Adapted from: https://github.com/ankonzoid/artificio/tree/master/similar_images_TL
import sys, os
import numpy as np
from keras.preprocessing import image
from keras.models import Model

from vgg19 import VGG19
from imagenet_utils import preprocess_input
from plot import plot_query_answer
from sort import find_topk_unique
from KNN import kNN

def main():
    base_model = VGG19(weights='imagenet')
    model = Model(inputs=base_model.input, outputs=base_model.get_layer('block4_pool').output)

    imgs, filename_heads, X = [], [], []
    path = "../python-code2/DB"

    for f in os.listdir(path):
        filename = os.path.splitext(f)
        filename_full = os.path.join(path,f)
        head, ext = filename[0], filename[1]
        if ext.lower() not in [".jpg", ".jpeg", ".png"]:
            continue

        img = image.load_img(filename_full, target_size=(224, 224))
        imgs.append(np.array(img))
        filename_heads.append(head)

        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)
        features = model.predict(img).flatten()
        X.append(features)

    X = np.array(X)
    imgs = np.array(imgs)

    n_neighbours = 3 + 1
    knn = kNN()
    knn.compile(n_neighbors=n_neighbours, algorithm="brute", metric="cosine")
    knn.fit(X)

    output_rec_dir = os.path.join("../", "python-code2", "output", "recommendations")
    if not os.path.exists(output_rec_dir):
        os.makedirs(output_rec_dir)
    n_imgs = len(imgs)
    ypixels, xpixels = imgs[0].shape[0], imgs[0].shape[1]
    for ind_query in range(n_imgs):

        distances, indices = knn.predict(np.array([X[ind_query]]))
        distances = distances.flatten()
        indices = indices.flatten()
        indices, distances = find_topk_unique(indices, distances, n_neighbours)

        rec_filename = os.path.join(output_rec_dir, "{}_rec.png".format(filename_heads[ind_query]))
        x_query_plot = imgs[ind_query].reshape((-1, ypixels, xpixels, 3))
        x_answer_plot = imgs[indices].reshape((-1, ypixels, xpixels, 3))
        plot_query_answer(x_query=x_query_plot,
                          x_answer=x_answer_plot[1:],  # remove itself
                          filename=rec_filename)

    print('finished')

if __name__ == "__main__":
    main()