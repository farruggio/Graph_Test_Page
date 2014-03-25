

lis1=[]
lis1.push('a')
lis1.push('b')

lis2=["a","b","c"];

//lis3=lis2 % lis1

/*
data=[1,2,3,3,3,4,5,6,7]
for (var i = data.length-1; i >= 0; i--) {
    if (data[i]=== 3) {
        data.splice(i, 1);
        debug(data)
    }
}*/


Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

debug(diff)


var diff = $(lis2).not(lis1).get();