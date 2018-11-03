import numpy as np
from vgg16 import VGG16
from keras.preprocessing import image
from keras.applications.imagenet_utils import preprocess_input
from imagenet_utils import decode_predictions

model = VGG16(include_top=True, weights='imagenet')