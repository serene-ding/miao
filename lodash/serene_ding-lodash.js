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

        f = iteratee(f)
        for (var i = fromIndex; i < array.length; i++) {
            if (f(array[i])) {
                return i
            }
        }

    }

    function dropRightWhile(array, predicate) {

        var len = array.length
        var n = 0
        var i = len - 1
        predicate = iteratee(predicate)
        while ((i >= 0) && predicate(array[i])) {
            i--
            n++
        }
        //i = len
        if (i == -1) {
            n = len
        }
        var res = array.slice(0, len - n)
        return res

    }

    function property(str) {
        return function(obj) {
            return obj[str]
        }
    }
    //matchProperty [array]
    function matchesProperty(array) {

        return function(obj) {
            return isEqual(obj[array[0]], array[1])
        }
    }

    function matches(source) {
        return function(obj) {
            for (var pro in source) {
                if (!isEqual(source[pro], obj[pro])) {
                    return false
                }
            }
            return true
        }
    }

    function iteratee(predicate) {
        if (typeof predicate == 'string') {

            return property(predicate)
        } else if (isArray(predicate)) {
            return matchesProperty(predicate)
        } else if (isObject(predicate)) {
            return matches(predicate)
        } else {
            return predicate
        }
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

    function identity(p) {
        return p
    }

    function differenceBy(array, values, f = identity) {
        var res = []
        var all_array = true
        var valuesList = []
        for (var i = 0; i < arguments.length; i++) {
            var item = arguments[i]
            if (!isArray(item)) {
                all_array = false
            }
            if (i > 0 && isArray(item)) {
                valuesList = valuesList.concat(item)
            }

        }
        var arguList = Array.prototype.slice.call(arguments)

        if (all_array) {

            f = identity
        } else {
            f = arguList[arguList.length - 1]
            f = iteratee(f)
        }

        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            var ok = true
            for (var j = 0; j < valuesList.length; j++) {
                var value = valuesList[j]
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
        f = iteratee(f)
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
        f = iteratee(f)
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
        predicate = iteratee(predicate)
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
        f = iteratee(f)
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
        f = iteratee(f)
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
        predicate = iteratee(predicate)
        while ((i <= len - 1) && predicate(array[i])) {
            i++
            n++
        }
        //i = len

        var res = array.slice(n, len)
        return res


    }

    function findLastIndex(array, f, fromIndex = array.length - 1) {
        f = iteratee(f)

        for (var i = fromIndex; i >= 0; i--) {
            if (f(array[i])) {
                return i
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
        iteratee = serene_ding.iteratee(iteratee)
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
        iteratee = serene_ding.iteratee(iteratee)
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

    function sortedLastIndex(array, value) {
        if (value < array[0]) {
            return 0
        }
        for (var i = 0; i < array.length - 1; i++) {
            if (value >= array[i] && value < array[i + 1]) {
                return i + 1
            }
        }
    }

    function sortedLastIndexBy(array, value, iteratee) {

        iteratee = serene_ding.iteratee(iteratee)
        if (iteratee(value) < iteratee(array[0])) {
            return 0
        }
        for (var i = 0; i < array.length - 1; i++) {
            if (iteratee(value) >= iteratee(array[i]) && iteratee(value) < iteratee(array[i + 1])) {
                return i + 1
            }
        }
    }

    function sortedUniq(array) {
        var res = []
        for (var item of array) {
            if (res.length == 0 || res[res.length - 1] != item) {
                res.push(item)
            }
        }
        return res
    }

    function sortedUniqBy(array, iteratee) {
        var res = []
        for (var item of array) {
            if (res.length == 0 || iteratee(res[res.length - 1]) != iteratee(item)) {
                res.push(item)
            }
        }
        return res
    }

    function tail(array) {
        return array.slice(1)
    }

    function take(array, n = 1) {
        return array.slice(0, n)
    }

    function takeRight(array, n = 1) {

        var len = array.length
        if (n <= len) {
            return array.slice(len - n)
        } else {
            return array.slice()
        }

    }

    function takeRightWhile(array, predicate) {
        var len = array.length
        var n = 0
        var i = len - 1
        predicate = iteratee(predicate)
        while ((i >= 0) && predicate(array[i])) {
            i--
            n++
        }
        //i = len

        var res = array.slice(len - n, len)
        return res

    }

    function takeWhile(array, predicate) {
        var len = array.length
        var n = 0
        var i = 0
        predicate = iteratee(predicate)
        while (i < len && predicate(array[i])) {
            i++
            n++
        }
        return array.slice(0, n)
    }

    function union(...arrays) {
        var arrays_ = []
        for (var array of arrays) {
            arrays_ = arrays_.concat(array)
        }
        return uniq(arrays_)
    }

    function unionBy(arrays, predicate) {
        var arguList = Array.prototype.slice.call(arguments)
        var Arrays = arguList.slice(0, -1)
        var predicate = arguList[arguList.length - 1]
        var arrays_ = []
        for (var array of Arrays) {
            arrays_ = arrays_.concat(array)
        }
        return uniqBy(arrays_, predicate)
    }

    function unionWith(arrays, comparator) {
        var arguList = Array.prototype.slice.call(arguments)
        var Arrays = arguList.slice(0, -1)
        var comparator = arguList[arguList.length - 1]
        var arrays_ = []
        for (var array of Arrays) {
            arrays_ = arrays_.concat(array)
        }
        return uniqWith(arrays_, comparator)
    }

    function flatMap(collection, predicate = serene_ding.identity) {
        var res1 = map(collection, predicate)
        var res2 = flatten(res1)
        return res2
    }

    function flatMapDeep(collection, predicate = serene_ding.identity) {
        var res1 = map(collection, predicate)
        var res2 = flattenDeep(res1)
        return res2
    }

    function flatMapDepth(collection, predicate = serene_ding.identity, n = 1) {
        var res1 = map(collection, predicate)
        var res2 = flattenDepth(res1, n)
        return res2
    }

    function filter(collection, predicate = _.identity) {
        var res = []
        predicate = iteratee(predicate)
        for (var i of collection) {
            if (predicate(i)) {
                res.push(i)
            }
        }
        return res
    }

    function forEach(collection, predicate = _.identity) {
        predicate = iteratee(predicate)
        for (var i in collection) {
            predicate(collection[i], i, collection)
        }
    }

    function unzip(array) {
        var res = []
        var N = array[0].length

        for (var i = 0; i < N; i++) {
            res[i] = []
            res[i][0] = array[0][i]
            res[i][1] = array[1][i]
        }
        return res
    }

    function add(a, b) {
        return a + b
    }

    function unzipWith(array, predicate) {
        var res = []
        var temp = unzip(array)
        for (i of temp) {
            res.push(predicate(i[0], i[1]))
        }
        return res
    }

    function without(array, ...values) {
        var res = []
        for (var a of array) {
            var ok = true
            for (var v of values) {
                if (a == v) {
                    ok = false
                }
            }
            if (ok) {
                res.push(a)
            }
        }
        return res
    }

    function includes(collection, value, fromIndex = 0) {
        // object string array
        if (typeof collection == "string") {
            for (var i = fromIndex; i < collection.length; i++) {
                var s = collection[i]
                if (s == value[0]) {
                    for (var j = 1; j < value.length; j++) {
                        s += collection[i + j]
                    }
                    if (s == value) {
                        return true
                    }
                }

            }
            return false
        } else if (Array.isArray(collection)) {
            for (var i = fromIndex; i < collection.length; i++) {
                var item = collection[i]
                if (item == value) {
                    return true
                }
            }
            return false
        } else {
            for (var prop in collection) {
                if (collection[prop] == value) {
                    return true
                }
            }
            return false
        }

    }
    //splice()
    function remove(array, predicate) {
        var deleted = []
        for (var index = 0; index < array.length; index++) {
            if (predicate(array[index], index, array)) {
                deleted.push(array[index])
                array.splice(index, 1)
                index--
            }
        }
        return deleted
    }

    function pullAt(array, indexes) {
        var deleted = []
        for (var i in indexes) {
            var index = indexes[i] - i
            var temp = (remove(array, function(_, i) {
                return i == index
            }))
            deleted = deleted.concat(temp)
        }
        return deleted
    }

    function xor(...Arrays) {
        var ary = [].concat(...Arrays)
        var map = {}
        for (let i = 0; i < ary.length; i++) {
            if (ary[i] in map) {
                map[ary[i]]++
            } else {
                map[ary[i]] = 1
            }
        }
        var res = []
        for (var key in map) {
            if (map[key] == 1) {
                res.push(Number(key))
            }
        }
        return res
    }

    function xorBy(array1, array2, predicate = identity) {

    }



    function xorWith(array1, array2, comparator) {

    }

    function pullisEqual(array, ...values) {
        for (var i = 0; i < array.length; i++) {
            var item1 = array[i]
            for (var j in values) {
                var item2 = values[j]
                if (isEqual(item1, item2)) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    }

    function slice(array, start = 0, end = array.length) {
        var res = []
        if (start < 0) {
            start = start + array.length
        }
        if (end < 0) {
            end = end + array.length
        }
        for (var i = start; i < end; i++) {
            res.push(array[i])
        }
        return res
    }

    function countBy(collection, predicate = identity) {
        predicate = iteratee(predicate)
        var res = {}
        for (var item of collection) {
            var prop = predicate(item)
            if (prop in res) {
                res[prop]++
            } else {
                res[prop] = 1
            }
        }
        return res
    }

    function forEach(collection, iteratee = identity) {
        for (var prop in collection) {
            iteratee(collection[prop], prop)
        }
    }

    function forEachRight(collection, iteratee = identity) {
        for (var i = collection.length - 1; i >= 0; i--) {
            iteratee(collection[i], i)
        }
    }

    function every(collection, predicate = identity) {
        predicate = iteratee(predicate)
        for (var i of collection) {
            if (!predicate(i)) {
                return false
            }
        }
        return true
    }

    function filter(collection, predicate = identity) {
        predicate = iteratee(predicate)
        var passed = []
        for (var i = 0; i < collection.length; i++) {
            if (predicate(collection[i])) {
                passed.push(collection[i])

            }
        }
        return passed
    }

    function find(collection, predicate = identity, fromIndex = 0) {
        predicate = iteratee(predicate)
        for (var i = 0; i < collection.length; i++) {
            if (predicate(collection[i])) {
                return collection[i]

            }
        }
    }

    function findLast(collection, predicate = identity, fromIndex = 0) {
        predicate = iteratee(predicate)
        for (var i = collection.length - 1; i >= 0; i--) {
            if (predicate(collection[i])) {
                return collection[i]

            }
        }
    }

    function groupBy(collection, iteratee = identity) {
        var res = {}
        iteratee = serene_ding.iteratee(iteratee)
        for (var i of collection) {
            if (iteratee(i) in res) {
                res[iteratee(i)].push(i)
            } else {
                res[iteratee(i)] = [i]
            }
        }
        return res
    }

    function invokeMap(collection, path, args) {
        if (typeof path == "string") {
            path = collection[0][path]
        }
        //
        for (var i = 0; i < collection.length; i++) {

            collection[i] = path.call(collection[i], args)



        }
        return collection
    }

    function keyBy(collection, iteratee = identity) {
        var res = {}
        iteratee = serene_ding.iteratee(iteratee)
        for (var i of collection) {

            res[iteratee(i)] = i

        }
        return res
    }

    function sortBy(collection, iteratees = identity) {

        for (var i = 0; i < iteratees.length; i++) {
            iteratees[i] = serene_ding.iteratee(iteratees[i])
        }
        //这道题写得不完全。。。。
        function compare(predicate) { //这是比较函数
            return function(m, n) {
                var a = predicate(m);
                var b = predicate(n);
                if (typeof a == "string") {
                    return a.charCodeAt(0) - b.charCodeAt(0)
                } else {
                    return a - b;
                }
                //升序
            }
        }

        function compare1(iteratee1, iteratee2) {
            return function(a, b) {
                if (iteratee1(a) == iteratee1(b)) {
                    return (iteratee2(a) - iteratee2(b));
                } else {
                    return iteratee1(a).charCodeAt(0) - iteratee1(b).charCodeAt(0)
                }
            }

        }


        if (isArray(iteratees)) {
            collection.sort(compare1(...iteratees))
        } else {
            collection.sort(compare(iteratees))
        }

        return collection
    }

    function orderBy(collection, iteratees = identity, orders) {

    }

    function reduce(collection, iteratee = identity, accumulator = collection[0]) {
        var cur = accumulator
        if (arguments.length == 3) {
            for (var i in collection) {
                cur = iteratee(cur, collection[i], i)
            }
        } else {
            for (let i = 1; i < collection.length; i++) {
                cur = iteratee(cur, collection[i], i)
            }
        }

        return cur
    }

    function reduceRight(collection, iteratee = identity, accumulator) {
        if (isArray(collection)) {
            collection.reverse()
        }
        return reduce(collection, iteratee, accumulator)
    }

    function reject(collection, predicate = identity) {
        predicate = iteratee(predicate)
        var not_passed = []
        for (var i = 0; i < collection.length; i++) {
            if (!predicate(collection[i])) {
                not_passed.push(collection[i])

            }
        }
        return not_passed
    }

    function size(collection) {
        return Object.keys(collection).length
    }

    function some(collection, predicate = identity) {
        predicate = iteratee(predicate)
        for (var i of collection) {
            if (predicate(i)) {
                return true
            }
        }
        return false
    }

    function shuffle(array) {
        var newArray = array
        for (var i = newArray.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1))
            var randomValue = newArray[randomIndex]
            newArray[randomIndex] = newArray[i]
            newArray[i] = randomValue
        }
        return newArray
    }

    function checkShuffle(num, array) {
        var count = 0
        for (var j = 0; j <= 1000000; j++) {
            var newArray = shuffle(array)
            if (array[0] == num) {
                count++
            }
        }
        return count / 1000000
    }

    function before(n, func) {
        let result
        if (typeof func !== 'function') {
            throw new TypeError('Expected a function')
        }
        return function(...args) {
            if (--n > 0) {
                result = func.apply(this, args)
            }
            if (n <= 1) {
                func = undefined
            }
            return result
        }
    }

    function after(n, func) {
        let result
        if (typeof func !== 'function') {
            throw new TypeError('Expected a function')
        }
        return function(...args) {
            if (n > 1) {
                n--
            } else {
                return func(...args)
            }

        }
    }

    function ary(func, n = func.length) {
        return function(...args) {
            new_args = args.slice(0, n)
            return func(...new_args)
        }
    }

    function bind(func, thisArg, ...partials) {
        return partial(func.bind(thisArg), ...partials)
    }

    function bindKey(object, key, ...partials) {
        return function func(...args) {
            var res = []
            for (var i of partials) {
                if (i == "_") {
                    res.push(args.shift())

                } else {
                    res.push(i)
                }
            }
            if (args.length) {
                res = res.concat(args)
            }
            return object[key](...res)
        }
    }


    function partial(func, ...partials) {
        return function(...args) {
            var res = []
            for (var i of partials) {
                if (i == "_") {
                    res.push(args.shift())

                } else {
                    res.push(i)
                }
            }
            if (args.length) {
                res = res.concat(args)
            }
            return func(...res)
        }
    }



    function curry(func, ...args1) {

        return function wrapper(...args2) {
            temp = args1.slice()
            for (var i = 0; i < temp.length; i++) {
                if (args1[i] == "_") {
                    temp[i] = args2.shift()


                }
            }
            if (args2.length) {

                temp = args1.concat(args2)
            }
            if (temp.filter(i => i != '_').length >= func.length) {
                return func.apply(null, temp)
            }
            return curry(func, ...temp)
        }
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
        matchesProperty: matchesProperty,
        iteratee: iteratee,
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
        sortedLastIndex: sortedLastIndex,
        sortedLastIndexBy: sortedLastIndexBy,
        sortedUniq: sortedUniq,
        sortedUniqBy: sortedUniqBy,
        tail: tail,
        take: take,
        takeRight: takeRight,
        takeRightWhile: takeRightWhile,
        takeWhile: takeWhile,
        union: union,
        unionBy: unionBy,
        unionWith: unionWith,
        flatMap: flatMap,
        flatMapDeep: flatMapDeep,
        flatMapDepth: flatMapDepth,
        filter: filter,
        forEach: forEach,
        unzip: unzip,
        unzipWith: unzipWith,
        add: add,
        without: without,
        xor: xor,
        includes: includes,
        remove: remove,
        pullAt: pullAt,
        xorBy: xorBy,
        xorWith: xorWith,
        slice: slice,
        countBy: countBy,
        forEach: forEach,
        forEachRight: forEachRight,
        every: every,
        filter: filter,
        find: find,
        findLast: findLast,
        groupBy: groupBy,
        invokeMap: invokeMap,
        keyBy: keyBy,
        sortBy: sortBy,
        orderBy: orderBy,
        reduce: reduce,
        reduceRight: reduceRight,
        reject: reject,
        size: size,
        some: some,
        shuffle: shuffle,
        checkShuffle: checkShuffle,
        before: before,
        after: after,
        ary: ary,
        bind: bind,
        partial: partial,
        curry: curry,

        bindKey: bindKey,


    }





}()