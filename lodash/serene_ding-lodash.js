var serene_ding = {
    chunk : function(array,size=1){
        var res = []
        var j = 0
        while(j < array.length){
            var one_chunk = []
            for (var i = 0; i < size; i++){
                one_chunk[i] = array[j]
                
                j++
                if(j == array.length){
                    break
                }
            }
            res.push(one_chunk)
        }
        return res      
    },
    compact : function(array){
        var res = []
        for (var i = 0; i < array.length; i++){
            if(array[i]){
               res.push(array[i])
            }
        }
        return res
    },

    difference: function(array,...values){
        var res = []
        for (var i = 0; i < array.length; i++){
            var item = array[i]
            var equal = false
            for (var j = 0; j < values.length; j++){
                for (var k = 0; k < values[j].length; k++){
                    if (item == values[j][k]){
                        equal = true
                    }
                }
            }
            if (!equal){
                res.push(item)
            }
            
        }
        return res
    },

    concat: function(array,...values){
        //copy the array
        var c_array = []
        for (var k = 0; k < array.length; k++){
            c_array[k] = array[k]
        }
        //concat
        for (var i = 0; i < values.length; i++){
            let item = values[i]
            if (typeof(item) == 'number'){
                c_array.push(item)
            }else {
                for (var j = 0; j < item.length; j++){
                    c_array.push(item[j])
                }
            }
        }
        return c_array
    }

}