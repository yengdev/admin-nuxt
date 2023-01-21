import Vue from "vue"

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__global__) {
    Vue.__global__ = true
    Vue.mixin({
        data() {
            return {
                newCode: []
            }
        },
        computed: {
        },
        methods: {
            // Generate the excel.
            generateExcel(fileName, excelData) {
                let columnNames = ''
                if (excelData.length === 0) { return null }
                const csvString = excelData.map((item) => {
                    const tempColumnNames = []
                    const columnValues = []
                    for (const [key, value] of Object.entries(item)) {
                        columnValues.push(value)
                        tempColumnNames.push(key)
                    }
                    columnNames = tempColumnNames
                    return columnValues
                })

                columnNames = columnNames.join()
                csvString.forEach(function (row) {
                    columnNames += '\n' + row.join(',')
                })

                const hiddenElement = document.createElement('a')
                hiddenElement.href =
                    'data:text/csv;charset=utf-8,' +
                    encodeURIComponent('\uFEFF' + columnNames)
                hiddenElement.target = '_blank'
                hiddenElement.download = fileName + '.csv'
                hiddenElement.click()
            },

        }
    }) // Set up your mixin then
}