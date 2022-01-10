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

    difference: function(array,values){
        var res = []
        for (var i = 0; i < array.length; i++){
            var item = array[i]
            var equal = false
            for (var j = 0; j < values.length; j++){
                if (item == values[j]){
                    equal = true
                }
            }
            if (!equal){
                res.push(item)
            }
            
        }
        return res
    }

}