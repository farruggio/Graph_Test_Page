function levaduplicati(OriginaleArr) {
    var newArr = [],
    OriginaleLen = OriginaleArr.length,
    found,
    x, y;
     
    for ( x = 0; x <OriginaleLen; x++ ) {
    found = undefined;
    for ( y = 0; y <newArr.length; y++ ) {
    if ( OriginaleArr[x] === newArr[y] ) {
    found = true;
    break;
    }
    }
    if ( !found) newArr.push( OriginaleArr[x] );
    }
    return newArr;
    }


    