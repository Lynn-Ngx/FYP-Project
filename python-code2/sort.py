import numpy as np

def find_topk_unique(indices, distances, k):

    i_sort_1 = np.argsort(distances)
    distances_sorted = distances[i_sort_1]
    indices_sorted = indices[i_sort_1]

    window = np.array(indices_sorted[:k], dtype=int)
    window_unique, j_window_unique = np.unique(window, return_index=True)
    j = k
    while len(window_unique) != k:
        j_window_unique = np.append(j_window_unique, [j])
        window = np.append(window_unique, [indices_sorted[j]])
        window_unique, j_window_unique_temp = np.unique(window, return_index=True)
        j_window_unique = j_window_unique[j_window_unique_temp]
        j += 1

    distances_sorted_window = distances_sorted[j_window_unique]
    indices_sorted_window = indices_sorted[j_window_unique]
    u_sort = np.argsort(distances_sorted_window)

    distances_top_k_unique = distances_sorted_window[u_sort].reshape((1, -1))
    indices_top_k_unique = indices_sorted_window[u_sort].reshape((1, -1))

    return indices_top_k_unique, distances_top_k_unique

