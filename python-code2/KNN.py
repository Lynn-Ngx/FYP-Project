from sklearn.neighbors import NearestNeighbors

class kNN(object):

    def __init__(self):
        self.n_train = None
        self.n_test = None
        self.d = None

        self.n_neighbours = None
        self.algorithm = None
        self.metric = None
        self.model = None

        super().__init__()

    def compile(self, n_neighbors, algorithm, metric):
        self.n_neighbors = n_neighbors
        self.algorithm = algorithm
        self.metric = metric
        self.model = NearestNeighbors(n_neighbors=n_neighbors, algorithm=algorithm, metric=metric)

    def fit(self, x_train):
        self.n_train = x_train.shape[0]
        self.d = x_train.shape[1]
        self.model.fit(x_train)  # fit kNN

    def predict(self, x_test):
        self.n_test = x_test.shape[0]
        if x_test.shape[1] != self.d:
            raise Exception("Inconsistent feature dimensions between training and test data!")
        distances, indices = self.model.kneighbors(x_test, return_distance=True)  # predict kNN
        return distances, indices