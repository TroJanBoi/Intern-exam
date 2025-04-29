#include <stdio.h>
#include <stdlib.h>

int brickOnTheWall(int bandle[], int len) {

    int brick = 0;
    int nbr_current = 0;
    for(int i = 0; i < len; i++) {
        if (nbr_current < bandle[i]) {
            while (nbr_current < bandle[i]) {
                brick++;
                nbr_current++;
            }
        }
        nbr_current = bandle[i];
    }   

    return (brick);
}

int main() {
    int bandle[] = {1,2,3,4,5,6};
    int bandle2[] = {1,2,2,1,5,6};
    
    int length = sizeof(bandle) / sizeof(bandle[0]);
    int length2 = sizeof(bandle2) / sizeof(bandle2[0]);


    printf("%d\n", brickOnTheWall(bandle, length));
    printf("%d\n", brickOnTheWall(bandle2, length2));

}

