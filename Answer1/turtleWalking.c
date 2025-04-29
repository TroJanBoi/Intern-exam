
#include <stdio.h>

void turtleWalking(int rows, int cols, int matrix[rows][cols]) {
    for (int col = 0; col < cols; col++) {
        if (col % 2 == 0) {
            for (int row = 0; row < rows; row++) {
                printf("%d", matrix[row][col]);
                if (!(col == cols - 1 && row == rows - 1)) 
                    printf(",");
            }
        } else {
            for (int row = rows - 1; row >= 0; row--) {
                printf("%d", matrix[row][col]);
                if (!(col == cols - 1 && row == 0)) 
                    printf(",");
            }
        }
    }
    printf("\n");
}

int main() {


    int matrix[6][7] = {
        {7,2,0,1,0,2,9},
        {8,4,8,6,9,3,3},
        {7,8,8,8,9,0,6},
        {4,7,2,7,0,0,7},
        {6,5,7,8,0,7,2},
        {8,1,8,5,4,5,2}
    };

    turtleWalking(6, 7, matrix);

    int matrix2[3][3] = {
        {7,2,0},
        {8,4,8},
        {7,8,8}
    };

    turtleWalking(3, 3, matrix2);

    int matrix3[2][3] = {
        {7,2,0},
        {8,4,8}
    };
    turtleWalking(2, 3, matrix3);
    return 0;
}
