var serene_ding = {
    chunk: function(array, size = 1) {
        var res = []
        var j = 0
        while (j < array.length) {
            var one_chunk = []
            for (var i = 0; i < size; i++) {
                one_chunk[i] = array[j]

                j++
                if (j == array.length) {
                    break
                }
            }
            res.push(one_chunk)
        }
        return res
    },
    compact: function(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    },

    difference: function(array, ...values) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            var equal = false
            for (var j = 0; j < values.length; j++) {
                for (var k = 0; k < values[j].length; k++) {
                    if (item == values[j][k]) {
                        equal = true
                    }
                }
            }
            if (!equal) {
                res.push(item)
            }

        }
        return res
    },

    concat: function(array, ...values) {
        //copy the array
        var c_array = []
        for (var k = 0; k < array.length; k++) {
            c_array[k] = array[k]
        }
        //concat
        for (var i = 0; i < values.length; i++) {
            let item = values[i]
            if (typeof(item) == 'number') {
                c_array.push(item)
            } else {
                for (var j = 0; j < item.length; j++) {
                    c_array.push(item[j])
                }
            }
        }
        return c_array
    },

    drop: function(array, n = 1) {
        var res = []
        for (var i = n, j = 0; i < array.length; i++, j++) {
            res[j] = array[i]
        }
        return res
    },

    dropRight: function(array, n = 1) {
        var res = []
        for (var i = 0, j = 0; i < array.length - n; i++, j++) {
            res[j] = array[i]
        }
        return res
    },

    dropRightwhile: function(array, f) {
        var n = 0
        var i = 0
        while (i < array.length) {
            if (!f(array[i])) {
                break
            }
            i++
            n++
        }
        //drop_right
        var res = []
        for (var i = 0, j = 0; i < array.length - n; i++, j++) {
            res[j] = array[i]
        }
        return res
    },

    fill: function(array, value, start = 0, end = array.length) {
        if (arguments.length == 2) {
            for (var i = 0; i < array.length; i++) {
                array[i] = value
            }
        } else if (arguments.length == 3) {
            for (var i = start; i < array.length; i++) {
                array[i] = value
            }
        } else {
            for (var i = start; i < end; i++) {
                array[i] = value
            }
        }
        return array
    },
    //Array.isArray()
    findIndex: function(array, f, fromIndex = 0) {
        if (typeof f == 'function') {
            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (f(item)) {
                    return i
                }
            }
        } else if (typeof f == 'string') {
            var property = f
            var f = function(item) {
                return item[property]
            }
            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (f(item)) {
                    return i
                }
            }
        } else if (Array.isArray(f)) {

            var property = f[0]
            var value = f[1]
            var f = function(item) {
                return item[property] == value
            }
            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (f(item)) {
                    return i
                }
            }
        } else {

        }
    },
    flatten: function(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            if (Array.isArray(item)) {

                for (var j = 0; j < item.length; j++) {
                    res.push(item[j])
                }
            } else {
                res.push(item)
            }
        }
        return res
    },
    flattenDeep: function(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            if (Array.isArray(item)) {

                var temp = serene_ding.flattenDeep(item)
                for (var j = 0; j < temp.length; j++) {
                    res.push(temp[j])
                }
            } else {
                res.push(item)
            }
        }
        return res
    },
    head: function(array) {
        return array[0]
    },

    indexOf: function(array, value, fromIndex = 0) {
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
        return -1

    },
    initial: function(array) {
        var ini = []
        for (var i = 0; i < array.length - 1; i++) {
            ini[i] = array[i]
        }
        return ini
    },
    fromPairs: function(pairs) {
        var res = {}
        for (var i = 0; i < pairs.length; i++) {
            var one_pair = pairs[i]
            var pro = one_pair[0]
            var value = one_pair[1]
            res[pro] = value
        }
        return res
    },
    join: function(array, separator = ',') {
        var res = ''
        for (var i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                res += array[i]
            } else {
                array[i] += ''
                res += array[i] + separator
            }
        }
        return res
    },
    last: function(array) {
        for (var i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                return array[i]
            }
        }
    },
    flattenDeepth: function(array, depth = 1) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            if (depth != 0 && Array.isArray(item)) {

                var temp = serene_ding.flattenDeepth(item, depth - 1)
                for (var j = 0; j < temp.length; j++) {
                    res.push(temp[j])
                }
            } else if (depth == 0) {
                res.push(item)
            } else {
                res.push(item)
            }
        }
        return res
    }



}