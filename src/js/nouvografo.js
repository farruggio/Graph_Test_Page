

function graphNew(data1,nei){
  var alpha=data1.nodes
  var ausilio=[]
  for (i in alpha){ausilio.push(alpha[i].Gene_Symbol)}
  var difference = ausilio.diff(nei)
return difference;





Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
      };  


      }