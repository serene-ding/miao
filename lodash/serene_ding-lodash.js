var serene_ding = function() {
    function chunk(array, size = 1) {
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
    }

    function compact(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    }

    function difference(array, ...values) {
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
    }

    function concat(array, ...values) {
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
    }

    function drop(array, n = 1) {
        var res = array.slice(n)

        return res
    }

    function dropRight(array, n = 1) {
        if (n < array.length) {
            var res = array.slice(0, array.length - n)
        } else {
            var res = []
        }
        return res
    }



    function fill(array, value, start = 0, end = array.length) {
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
    }
    //Array.isArray()
    function findIndex(array, f, fromIndex = 0) {
        if (typeof f == 'function') {
            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (f(item)) {
                    return i
                }
            }

        } else if (typeof f == 'string') {
            var property = f

            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (serene_ding.property(item, property)) {
                    return i
                }
            }
        } else if (Array.isArray(f)) {
            var ary = f

            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (serene_ding.matchProperty(item, ary)) {
                    return i
                }
            }
        } else {
            var obj = f
            for (var i = fromIndex; i < array.length; i++) {
                var item = array[i]
                if (serene_ding.isEqual(item, obj)) {
                    return i
                }
            }
        }

    }

    function dropRightWhile(array, predicate) {

        var len = array.length
        var n = 0
        var i = len - 1
        if (typeof predicate == 'string') {
            var p = predicate
            predicate = function(obj) {
                return property(obj, p)
            }
        } else if (isArray(predicate)) {
            var a = predicate
            predicate = function(obj) {
                return matchProperty(obj, a)
            }
        } else if (isObject(predicate)) {
            var obj1 = predicate
            predicate = function(obj2) {
                return isEqual(obj1, obj2)
            }
        }
        while (predicate(array[i]) && (i >= -1)) {
            i--
            n++
        }
        //i = len
        if (i == -2) {
            n = len
        }
        var res = array.slice(0, len - n)
        return res

    }

    function property(obj, str) {
        return obj[str]
    }

    function matchProperty(obj, array) {
        var property = array[0]
        var value = array[1]
        return serene_ding.isEqual(obj[property], value)
    }

    function flatten(array) {
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
    }

    function flattenDeep(array) {
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
    }

    function head(array) {
        return array[0]
    }

    function indexOf(array, value, fromIndex = 0) {
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
        return -1

    }

    function initial(array) {
        var ini = []
        for (var i = 0; i < array.length - 1; i++) {
            ini[i] = array[i]
        }
        return ini
    }

    function fromPairs(pairs) {
        var res = {}
        for (var i = 0; i < pairs.length; i++) {
            var one_pair = pairs[i]
            var pro = one_pair[0]
            var value = one_pair[1]
            res[pro] = value
        }
        return res
    }

    function join(array, separator = ',') {
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
    }

    function last(array) {
        for (var i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                return array[i]
            }
        }
    }

    function flattenDepth(array, depth = 1) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            if (depth != 0 && Array.isArray(item)) {

                var temp = serene_ding.flattenDepth(item, depth - 1)
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

    function isEqual(a, b) {
        if (a === b) {
            return true
        }
        // a and b are of different type
        if (a == null || typeof a != "object" ||
            b == null || typeof b != "object") {
            return false
        }

        var propsInA = 0,
            propsInB = 0;

        for (var prop in a)
            propsInA += 1;

        for (var prop in b) {
            propsInB += 1;
            if (!(prop in a) || !serene_ding.isEqual(a[prop], b[prop]))
                return false;
        }

        return propsInA == propsInB;

    }

    function differenceBy(array, values, f) {
        var res = []
        var all_array = true
        for (item of arguments) {
            if (!Array.isArray(item)) {
                all_array = false
            }
        }
        var arguList = Array.prototype.slice.call(arguments)
        if (all_array) {
            var pula = arguList.slice(1)
            var values = []
            for (i in pula) {
                values = values.concat(pula[i])
            }
            f = function(i) {
                return i
            }
        }
        if (isFunction(last(arguList))) {
            var pula = arguList.slice(1, -1)
            var values = []
            for (i in pula) {
                values = values.concat(pula[i])
            }
            f = last(arguList)
        }

        if (typeof f == 'string') {
            var prop = f
            f = function(obj) {
                return serene_ding.property(obj, prop)
            }

        }
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            var ok = true
            for (var j = 0; j < values.length; j++) {
                var value = values[j]
                if (f(item) == f(value)) {
                    ok = false
                }
            }
            if (ok) {
                res.push(item)
            }
        }
        return res
    }

    function differenceWith(array, values, f) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            var ok = true
            for (var j = 0; j < values.length; j++) {
                var value = values[j]
                if (f(item, value)) {
                    ok = false
                }
            }
            if (ok) {
                res.push(item)
            }
        }
        return res
    }

    function reverse(array) {
        for (var i = 0; i < Math.floor(array.length / 2); i++) {
            var old = array[i]
            array[i] = array[array.length - i - 1]
            array[array.length - i - 1] = old
        }
        return array
    }

    function uniq(array) {
        var obj = {}
        res = []
        for (i of array) {
            if (i in obj) {

            } else {
                obj[i] = 1
                res.push(i)
            }
        }
        return res
    }
    // what is the optimal solution
    function uniqBy(array, f) {
        if (typeof f == 'string') {
            var property = f
            f = function(obj) {
                return serene_ding.property(obj, property)
            }
        }
        var obj = {}
        res = []
        for (i of array) {
            if (f(i) in obj) {

            } else {
                obj[f(i)] = 1
                res.push(i)
            }
        }
        return res

    }

    function uniqWith(array, comparator) {

        var res = []
        for (i in array) {
            var item = array[i]
            ok = true
            for (j in res) {
                var r = res[j]
                if (comparator(item, r)) {
                    ok = false
                }
            }
            if (ok) {

                res.push(item)
            }
        }
        return res
    }

    function zip(...arrays) {
        var res = []
        var rl = arrays[0].length
        res.length = rl

        var j = 0
        while (j < rl) {
            res[j] = []
            for (i in arrays) {

                res[j][i] = arrays[i][j]
            }
            j++
        }
        return res
    }

    function map(collection, f) {
        var res = []
        if (typeof f == 'string') {
            var prop = f
            f = function(obj) {
                return serene_ding.property(obj, prop)
            }
        }
        for (i in collection) {
            res.push(f(collection[i]))
        }
        return res
    }

    function partition(collection, predicate) {
        var res = []
        for (var i = 0; i < 2; i++) {
            res[i] = []
        }
        if (typeof predicate == 'string') {
            var prop = predicate
            predicate = function(obj) {
                return serene_ding.property(obj, prop)
            }
        } else if (Array.isArray(predicate)) {
            var ary = predicate
            predicate = function(obj) {
                return serene_ding.matchProperty(obj, ary)
            }
        } else if (typeof predicate == 'object') {
            var obj1 = predicate
            predicate = function(obj2) {
                return serene_ding.isParitiallyEqual(obj1, obj2)
            }
        }
        for (i in collection) {
            var obj = collection[i]
            if (predicate(obj)) {
                res[0].push(obj)
            } else {
                res[1].push(obj)
            }
        }
        return res

    }

    function isParitiallyEqual(obj1, obj2) {
        var l1 = Object.keys(obj1).length;
        var l2 = Object.keys(obj2).length;
        var l = Math.min(l1, l2)
        if (l1 < l2) {
            var less = obj1
            var more = obj2
        } else {
            less = obj2
            more = obj1
        }
        for (var i = 0; i < l; i++) {
            for (entry in less) {
                if (!(entry in more)) {
                    return false
                } else if (!serene_ding.isEqual(more[entry], less[entry])) {
                    return false
                }
            }
        }
        return true
    }

    function countBy(collection, f) {
        var res = {}
        if (typeof f == 'string') {
            var prop = f
            f = function(obj) {
                return serene_ding.property(obj, prop)
            }
        }
        for (item of collection) {
            var p = f(item)
            if (p in res) {
                res[p]++
            } else {
                res[p] = 1
            }
        }
        return res
    }

    function keyBy(collection, f) {
        var res = {}
        if (typeof f == 'string') {
            var prop = f
            f = function(obj) {
                return serene_ding.property(obj, prop)
            }
        }
        for (item of collection) {

            var pName = f(item)
            res[pName] = item
        }
        return res
    }

    function isArray(val) {
        return Object.prototype.toString.call(val) == '[object Array]'
    }

    function isBoolean(val) {
        return Object.prototype.toString.call(val) == '[object Boolean]'
    }

    function isDate(val) {
        return val instanceof Date
    }

    function isFunction(val) {
        return Object.prototype.toString.call(val) == '[object Function]'
    }

    function isObject(val) {
        return (typeof val) == "object"
    }

    function dropWhile(array, predicate) {
        var len = array.length
        var n = 0
        var i = 0
        if (typeof predicate == 'string') {
            var p = predicate
            predicate = function(obj) {
                return property(obj, p)
            }
        } else if (isArray(predicate)) {
            var a = predicate
            predicate = function(obj) {
                return matchProperty(obj, a)
            }
        } else if (isObject(predicate)) {
            var obj1 = predicate
            predicate = function(obj2) {
                return isEqual(obj1, obj2)
            }
        }
        while ((i <= len - 1) && predicate(array[i])) {
            i++
            n++
        }
        //i = len

        var res = array.slice(n, len)
        return res


    }

    function findLastIndex(array, f, fromIndex = array.length - 1) {
        if (typeof f == 'function') {
            for (var i = fromIndex; i >= 0; i--) {
                var item = array[i]
                if (f(item)) {
                    return i
                }
            }

        } else if (typeof f == 'string') {
            var property = f

            for (var i = fromIndex; i >= 0; i--) {
                var item = array[i]
                if (serene_ding.property(item, property)) {
                    return i
                }
            }
        } else if (Array.isArray(f)) {
            var ary = f

            for (var i = fromIndex; i >= 0; i--) {
                var item = array[i]
                if (serene_ding.matchProperty(item, ary)) {
                    return i
                }
            }
        } else {
            var obj = f
            for (var i = fromIndex; i >= 0; i--) {
                var item = array[i]
                if (serene_ding.isEqual(item, obj)) {
                    return i
                }
            }
        }

    }

    function intersection(arrays) {
        var temp = []
        for (var array of arguments) {
            var temp = temp.concat(array)
        }
        var obj = {}
        for (var i in temp) {
            var item = temp[i]
            if (item in obj) {
                obj[item]++
            } else {
                obj[item] = 1
            }
        }
        var r = []
        for (var entry in obj) {
            if (obj[entry] == arguments.length) {
                r.push(Number(entry))
            }
        }
        return r
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        for (var i = fromIndex; i < array.length; i--) {
            if (array[i] == value) {
                return i
            }
        }
        return -1
    }

    function intersectionBy(arrays, iteratee) {

        var arguList = Array.prototype.slice.call(arguments)
        var arrays = arguList.slice(0, -1)
        var iteratee = arguList[arguments.length - 1]
        if (typeof iteratee == 'string') {
            var str = iteratee
            iteratee = function(obj) {
                return property(obj, str)
            }
        }
        var map = new Map()
        var array1 = arrays[0]
        for (var i in array1) {
            var item = array1[i]
            var ratee = iteratee(item)
            map.set(ratee, item)
        }
        var r = []
        var array2 = arrays[1]
        for (var j in array2) {
            var item = array2[j]
            var ratee = iteratee(item)
            if (map.has(ratee)) {
                r.push(map.get(ratee))
            }
        }
        return r
    }

    function intersectionWith(arrays, comparator) {
        var arguList = Array.prototype.slice.call(arguments)
        var arrays = arguList.slice(0, -1)
        var comparator = arguList[arguments.length - 1]
        var array1 = arrays[0]
        var array2 = arrays[1]
        var res = []
        for (var i in array1) {
            var item1 = array1[i]
            for (var j in array2) {
                var item2 = array2[j]
                if (comparator(item1, item2)) {
                    res.push(item1)
                }
            }
        }
        return res

    }

    function nth(array, n = 0) {
        if (n >= 0) {
            return array[n]
        } else {
            return array[array.length + n]
        }
    }

    function pull(array, ...values) {
        for (var i = 0; i < array.length; i++) {
            var item1 = array[i]
            for (var j in values) {
                var item2 = values[j]
                if (item1 == item2) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    }

    function pullAll(array, values) {
        return pull(array, ...values)
    }

    function pullAllBy(array, values, iteratee) {
        if (typeof iteratee == 'string') {
            var str = iteratee
            iteratee = function(obj) {
                return property(obj, str)
            }
        }
        for (var i = 0; i < array.length; i++) {
            var item1 = array[i]
            for (var j in values) {
                var item2 = values[j]
                if (iteratee(item1) == iteratee(item2)) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    }

    function pullAllWith(array, values, comparator) {
        for (var i = 0; i < array.length; i++) {
            var item1 = array[i]
            for (var j in values) {
                var item2 = values[j]
                if (comparator(item1, item2)) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    }

    function sortedIndex(array, value) {
        if (value <= array[0]) {
            return 0
        }
        for (var i = 0; i < array.length - 1; i++) {
            if (value > array[i] && value <= array[i + 1]) {
                return i + 1
            }
        }

    }

    function sortedIndexBy(array, value, iteratee) {
        if (typeof iteratee == 'string') {
            var str = iteratee
            iteratee = function(obj) {
                return property(obj, str)
            }
        }
        if (iteratee(value) <= iteratee(array[0])) {
            return 0
        }
        for (var i = 0; i < array.length - 1; i++) {
            if (iteratee(value) > iteratee(array[i]) &&
                iteratee(value) <= iteratee(array[i + 1])) {
                return i + 1
            }
        }

    }
    //binary search
    function sortedIndexOf(array, value) {

        var len = array.length

        var low = 0
        var high = len - 1
        while (low <= high) {
            var mid = low + ((high - low) >> 1)
            if (value < array[mid]) {
                high = mid - 1
            } else if (value > array[mid]) {
                low = mid + 1
            } else {
                while (array[mid - 1] == array[mid]) {
                    mid--
                }
                return mid
            }
        }
        return -1
    }

    function sortedLastIndexOf(array, value) {
        var len = array.length

        var low = 0
        var high = len - 1
        while (low <= high) {
            var mid = low + ((high - low) >> 1)
            if (value < array[mid]) {
                high = mid - 1
            } else if (value > array[mid]) {
                low = mid + 1
            } else {
                while (array[mid + 1] == array[mid]) {
                    mid++
                }
                return mid
            }
        }
        return -1
    }
    return {
        chunk: chunk,
        compact: compact,
        difference: difference,
        concat: concat,
        drop: drop,
        dropRight: dropRight,
        fill: fill,
        findIndex: findIndex,
        dropRightWhile: dropRightWhile,
        property: property,
        matchProperty: matchProperty,
        flatten: flatten,
        flattenDeep: flattenDeep,
        head: head,
        indexOf: indexOf,
        initial: initial,
        fromPairs: fromPairs,
        join: join,
        last: last,
        flattenDepth: flattenDepth,
        isEqual: isEqual,
        differenceBy: differenceBy,
        differenceWith: differenceWith,
        reverse: reverse,
        uniq: uniq,
        uniqBy: uniqBy,
        uniqWith: uniqWith,
        zip: zip,
        map: map,
        partition: partition,
        isParitiallyEqual: isParitiallyEqual,
        countBy: countBy,
        keyBy: keyBy,
        isArray: isArray,
        isBoolean: isBoolean,
        isDate: isDate,
        isFunction: isFunction,
        isObject: isObject,
        dropWhile: dropWhile,
        findLastIndex: findLastIndex,
        intersection: intersection,
        lastIndexOf: lastIndexOf,
        intersectionBy: intersectionBy,
        intersectionWith: intersectionWith,
        nth: nth,
        pull: pull,
        pullAll: pullAll,
        pullAllBy: pullAllBy,
        pullAllWith: pullAllWith,
        sortedIndex: sortedIndex,
        sortedIndexBy: sortedIndexBy,
        sortedIndexOf: sortedIndexOf,
        sortedLastIndexOf: sortedLastIndexOf,
    }



}()