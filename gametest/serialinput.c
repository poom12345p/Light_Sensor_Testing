//////////////////////////////////////////////////////////////////////////
//
//  Serial Data Input Processor
//
//  This module converts a serial data stream to a floating point value
//  It expects the serial input to follow this format:
//
//       ID=Value\n
//
//  Where:   ID = A single character that can be used to identify the 
//                received value.
//          Value = A floating point or int value. Must terminate with \n
//
//  Example:   a=102.752\n
//
//  This input will set:
//          gblSerInputVarID = 'a'
//          gblSerInputData = 102.752
//          gblSerInputNewValueAvailable = 1
//
//  The user must manually clear the gblSerInputNewValueAvailable flag.
//




#INT_RDA
void ser_isr() {
   char inChar;

   inChar = getchar();
   //printf("i=%u,c=%u",gblSerInputIndex, inChar);
   
   
   // first character is the ID. Can be only one character
   if (gblSerInputIndex == 0) {
      gblSerInputVarID = inChar-65;  // converts "A" -> 0
      gblSerInputIndex++;
     // printf("Name=%c", inChar);

   // second char must be an equal sign
   } else if (gblSerInputIndex == 1) {
      if (inChar != '=') {
         gblSerInputFormatError = 1 ;
      } else {
         gblSerInputFormatError = 0;
      }
      gblSerInputIndex++;
   } else if (inChar == '\n') {
      output_toggle(PIN_B6);
     
      if (!gblSerInputFormatError) { 
         gblSerInputBuffer[gblSerInputVarID][gblSerInputIndex-2] = 0;   // null terminated
         if (gblSerInputVarID == (SER_VAR_COUNT-1)) {
            gblSerInputNewValueAvailable=1;
         }
      }
      
      gblSerInputIndex = 0;
      gblSerInputFormatError = 0;
      
   } else if ((gblSerInputIndex > 1) && ((gblSerInputIndex-2) < SER_INPUT_BUFFER_LEN)) {
      if (!gblSerInputFormatError) { 
         if ((inChar >= '-') && (inChar <= '9')) {
            gblSerInputBuffer[gblSerInputVarID][gblSerInputIndex-2] = inChar;
            gblSerInputIndex++;
         }
      }
   } else {
      gblSerInputIndex = 0;
      gblSerInputFormatError = 0;
   }

}

void initSerInput() {
   enable_interrupts(INT_RDA);
   enable_interrupts(GLOBAL);
   
   gblSerInputIndex=0;
   gblSerInputFormatError = 0;
   
  // while (kbhit()) { getchar(); };  // clear the serial buffer

}
