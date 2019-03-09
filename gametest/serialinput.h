#include <stdlib.h>

#INT_RDA
void ser_isr();
void initSerInput();

#define SER_INPUT_BUFFER_LEN     8
#define SER_VAR_COUNT            2

float S,V;           // Variables used to store the recived values



char gblSerInputBuffer[SER_VAR_COUNT][SER_INPUT_BUFFER_LEN];   // the receive buffer
int1 gblSerInputNewValueAvailable=0;   // true when a new value has arrived.
                                       // user must manualy clear this flag.
int gblSerInputVarID=0;                // id of the received value


int gblSerInputIndex=0;
int1 gblSerInputFormatError=0;

