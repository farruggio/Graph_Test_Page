a=[1,2,3,4,5]
b=[1,2,3,6,7]


function betweeness(a,b){
  var ausilio1=[];
  var ausilio2=[];
  for (i in a){ausilio1.push(a[i])}
  for (i in b){ausilio2.push(b[i])}
  var diff = $(ausilio1).not(ausilio2).get();
var diff2 = $(ausilio2).not(ausilio1).get();

}debug(betweeness(a,b))