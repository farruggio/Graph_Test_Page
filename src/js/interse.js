a=[1,2,3,4,5]
b=[1,2,3,6,7]
c=[]
c=a;
var alpha=[]


                          function intersect(array1, array2) {
   var result = [];
   // Don't destroy the original arrays
   var a = array1.slice(0);
   var b = array2.slice(0);
   var aLast = a.length - 1;
   var bLast = b.length - 1;
   while (aLast >= 0 && bLast >= 0) {
      if (a[aLast] > b[bLast] ) {
         a.pop();
         aLast--;
      } else if (a[aLast] < b[bLast] ){
         b.pop();
         bLast--;
      } else /* they're equal */ {
         result.push(a.pop());
         b.pop();
         aLast--;
         bLast--;
      }
   }
   return result;
}


function intersect_all(lists)
{
    if (lists.length == 0) return [];
    else if (lists.length == 1) return lists[0];

    var partialInt = lists[0];
    for (var i = 1; i < lists.length; i++)
    {
        partialInt = intersect(partialInt, lists[i]);
    }
    return partialInt;
}

a=["CDC20", "EP300", "CDC23", "CDK2", "CCNB1", "UBE2S", "CREBBP", "DAXX", "MAD2L2", "AXIN2", "KDM5B", "SPATC1", "TP73", "TGFBR1", "PHF8", "HECW2", "ID1", "CDC6", "BUB1", "MAD2L1", "PTTG1", "COPS5", "FBXO5", "ANAPC5", "AURKB", "CUEDC2", "RASSF1", "UBE2C", "GMNN", "FZR1", "RNF34", "ANAPC7", "BUB1B", "TRIM33", "PLK1", "MDC1", "ANAPC13", "USP37", "ANAPC2", "CDC27", "MXI1", "ANAPC4", "BUB3", "UBC", "CCNA2", "CDR2", "CDC16", "ANAPC16", "ANAPC10", "CDC26", "CASC5", "NUDC", "HSF2", "ANAPC1", "TTK", "FBXW5", "HSF1", "NEK2", "AURKA", "HDAC6", "TUBG1", "CCNA1", "ANAPC11", "CDKN1A", "APP", "MAD2L1BP", "UBE2D2", "BTRC", "SKP2", "CKS1B", "CLSPN", "HDAC2", "HDAC1", "NINL", "KRTAP19-5", "KRT33A", "KRTAP9-2", "KRTAP9-3", "KRT32", "CCDC59", "YARS2", "KRT31", "KRT85", "SIRT1", "C11ORF51", "PAXIP1", "IST1", "TAS2R13", "CDT1", "TRRAP", "GM9174", "PIM1", "TK1", "SIRT2"]

debug(intersect(a,b))
debug(intersect_all(aa))