fs = require('fs')
const matrix = require('./matrix.js')

function gauss_forward(m) {
    let rows = m.get_rows()
    let cols = m.get_cols()
    let d;
    for (let j = 0; j < rows - 1; j++) {
        if (m.get(j, j) !== 0) {
            for (let i = j + 1; i < rows; i++) {
                d = -(m.get(i, j)) / (m.get(j, j))
                m.mull_add(i, j, d)
            }
        } else {
            m.swap_with_nonzero_row(j)
        }
    }
}

function gauss_backward(m) {
    let rows = m.get_rows()
    let cols = m.get_cols()
    let solutions = []
    for(let k = 0; k < rows; k++) {
        solutions.push(0)
    }
    let p;
    for (let i = rows - 1; i >= 0; i--) {
        let sum = 0
        for (let j = i + 1; j < cols - 1; j++) {
            sum += m.get(i, j) * solutions[j]
        }
        p = m.get(i, cols - 1) - sum
        solutions[i] = p / m.get(i, i)
    }
    return solutions
}

function gauss(m) {
    gauss_forward(m)
    if(m.exists_wrong_row() || m.exists_zero_row()) {
        return null
    }
    return gauss_backward(m)
}

function read_input() {
    let i_file = fs.readFileSync('input.txt', 'utf8')
    let i_list = i_file.split('\n')
    i_list.pop()
    for(let i = 1; i < i_list.length; i++) {
        i_list[i] = i_list[i].split(' ')
    }
    let m = new matrix(parseInt(i_list[0]))
    for(let i = 0; i < m.get_rows(); i++) {
        for(let j = 0; j < m.get_cols(); j++) {
            m.set(i, j, parseFloat(i_list[i+1][j]))
        }
    }
    return m
}

function read_golden() {
    return fs.readFileSync('golden.txt', 'utf8').split(' ')
}

function is_real(str) {
    let countDots = 0
    if(str[0] === '.' || str[str.length - 1] === '.') {
        return false;
    }
    for(let i = 0; i < str.length; i++) {
        if(str[i] === '-' && i === 0) {
            continue
        }
        if(str[i] < '0' || str[i] > '9') {
            if(str[i] === '.') {
                countDots++
            }
            else{
                return false
            }
        }
    }
    return countDots <= 1
}

function is_num(str)
{
    for(let i = 0; i < str.length; i++) {
        if(str[i] < '0' || str[i] > '9') {
            return false;
        }
    }
    return true;
}

function check_input() {
    let i_file = fs.readFileSync('input.txt', 'utf8')
    let i_list = i_file.split('\n')
    i_list.pop()
    for(let i = 1; i < i_list.length; i++) {
        i_list[i] = i_list[i].split(' ')
    }

    if(is_num(i_list[0]) === false) {
        return false
    }
    if(i_list.length !== parseInt(i_list[0]) + 1 || i_list.length !== i_list[1].length) {
        return false
    }
    for(let i = 1; i < i_list.length; i++) {
        for(let j = 0; j < i_list[0].length; j++) {
            if(is_real(i_list[i][j]) === false) {
                return false
            }
        }
    }
    return true
}

function write_in_file(list_name) {
    if(check_input()) {
        if(list_name == null) {
            fs.writeFileSync('output.txt', "no solution")
        } else {
            for(let i = 0; i < list_name.length; i++) {
                let d = (list_name[i]).toFixed(7)
                d = parseFloat(d)
                fs.appendFileSync('output.txt', d.toString() + ' ')
            }
        }
    } else {
        fs.writeFileSync('output.txt', "wrong imput")
    }
}

function cmp_lists(list1, list2) {
    if(list1.length !== list2.length) {
        return false
    }
    for(let i = 0; i < list1.length; i++) {
        if( parseFloat(list1[i]).toFixed(5) !==  parseFloat(list2[i]).toFixed(5)) {
            return false
        }
    }
    return true
}

module.exports = {cmp_lists, write_in_file, check_input, is_num, is_real, read_golden, read_input, gauss, gauss_backward, gauss_forward}
