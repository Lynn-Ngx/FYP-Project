import matplotlib.pyplot as plt

def plot_query_answer(x_query=None, x_answer=None, filename=None, gray_scale=False, n=5):
    plt.clf()
    plt.figure(figsize=(2*n, 4))

    for j, img in enumerate(x_answer):
        if (j >= n):
            break

        ax = plt.subplot(2, n, n + j + 1)
        plt.imshow(img)
        if gray_scale:
            plt.gray()
        ax.get_xaxis().set_visible(False)
        ax.get_yaxis().set_visible(False)
        for axis in ['top', 'bottom', 'left', 'right']:
            ax.spines[axis].set_linewidth(1)
            ax.spines[axis].set_color('black')

    if filename == None:
        plt.show()
    else:
        plt.savefig(filename, bbox_inches='tight')

    plt.close()