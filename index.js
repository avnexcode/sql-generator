const tableInput = document.querySelector('#table')
const entityInput = document.querySelector('#entity')
const formInput = document.querySelector('#form')
const insertCount = document.querySelector('#insertCount')
const insertValue = document.querySelector('#insert-value')
const btnInsertValue = document.querySelector("#generate-insert-value-button")
const sqlResult = document.querySelector('#sql-result')
const copyButton = document.querySelector("#copy-button")
const clearButton = document.querySelector('#clear-button')

const splitString = (string, gap) => string.split(gap)

const main = (tableName, entitiesTable, insertCount, inputGroup) => {
    if (inputGroup?.length > 0) {
        let entity = "", values = ""
        const asd = splitString(entitiesTable, ",")
        asd.forEach((item, i) => i !== asd.length - 1 ? entity += item + ',' : entity += item)
        for (let i = 0; i < insertCount; i++) {
            values += "("
            asd.forEach((item, j) => {
                const inputElements = inputGroup[i].children[0].children[j].children[1].children[0]
                // !inputElements.value && false
                j !== asd.length - 1 ? values += `'${inputElements.value}',` : values += `'${inputElements.value}'`
            })
            i !== insertCount - 1 ? values += '),' : values += ')'
        }
        sqlResult.innerHTML = `<pre>INSERT INTO ${tableName} (${entity}) VALUES ${values};</pre>`
    } else {
        return false
    }
}

const generateRandomID = () => {
    let output = ""
    const char = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    for (let i = 0; i < 12; i++) {
        output += char[Math.floor(Math.random() * char.length)]
    }
    return output
}

const renderInputValue = (entity, count) => {
    let elements = '';
    for (let i = 0; i < count; i++) {
        const inputsHTML = entity.map(item => {
            return `<tr>
                        <td><label for="${item}">${item}</label></td>
                        <td><input type="text" name="${item}" id="${item}" autocomplete="off" ${item === "id" && "value=" + generateRandomID()} ${item === "id" && "readonly disabled"}></td>
                    </tr>`;
        }).join("");
        elements += `<table class="table-input">${inputsHTML}</table>`;
    }
    insertValue.innerHTML = elements;
}

btnInsertValue.addEventListener('click', (e) => {
    renderInputValue(splitString(entityInput.value, ','), parseInt(insertCount.value))
})

formInput.addEventListener('submit', e => {
    e.preventDefault()
    const insertElement = e.target.children[2].children[3]
    let inputGroup
    insertElement.children.length > 0 ? inputGroup = insertElement.children : null
    main(tableInput.value, entityInput.value, parseInt(insertCount.value), inputGroup)
})

// ! - End
const copyText = () => {
    const text = sqlResult.children[0].innerText;
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Teks berhasil disalin");
}

copyButton.addEventListener('click', e => {
    copyText()
})

clearButton.addEventListener('click', e => {
    sqlResult.innerHTML = null
    insertValue.innerHTML = null
})