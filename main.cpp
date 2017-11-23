//
//  main.cpp
//  处理器调度
//
//  Created by 刘鑫 on 2017/11/15.
//  Copyright © 2017年 刘鑫. All rights reserved.
//

#include <iostream>
//#include <stdlib.h>
using namespace std;
#define LEN 100
int main(int argc, const char * argv[]) {
    // insert code here...
    int cometime[LEN];
    int costtime[LEN];
    cometime[0]=0;
    costtime[0]=rand()%8;
    srand((unsigned)time(NULL));
    for(int i=1;i<LEN;i++){
        cometime[i]=cometime[i-1]+rand()%4+1;
        costtime[i]=rand()%8+1;
    }
    for(int i=0;i<LEN;i++){
        cout<<cometime[i];
        cout<<' ';
        cout<<costtime[i]<<endl;
    }
    return 0;
}
