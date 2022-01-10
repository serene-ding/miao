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
    }
}