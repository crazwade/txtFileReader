<template>
  <div>
    <div>
      <input type="file" @change="handleFileChange">
      <pre>{{ fileContent }}</pre>
    </div>
    <div>
      <el-table :data="tableData" stripe  style="width: 100%">
        <el-table-column prop="className" label="鋼種" width="180" sortable />
        <el-table-column prop="diameter" label="直徑" width="180" sortable />
        <el-table-column prop="weight" label="未出貨重" width="180" sortable />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileContent = ref('')

interface TableDataItem {
  className: string;
  diameter: number;
  weight: number;
}

const tableData = ref<TableDataItem[]>([])

const handleFileChange = (event: Event) => {
  tableData.value = [];
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    // 定義當讀取完成時的回呼函式
    reader.onload = (e) => {
      const fileContent = e.target?.result as string // 取得檔案內容
      if (fileContent) {
        // 將檔案內容以換行符分割成一行一行的資料
        const lines = fileContent.split('\n')

        // 迭代處理每一行的資料
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim() // 取得每一行的資料並去除首尾空白

          // 使用正規表達式來分割資料成不同的欄位
          const parts = line.split(/\s+/)

          // 取得需要的欄位值
          const className = parts[2]
          const rule = parts[3]
          const heavy = parts[8]

          // 排除非資料區
          if (className && rule && heavy && className !== '----------') {
            if (parts.length === 16) {
              tableData.value.push({
                className: parts[2],
                diameter: Number(parts[3]),
                weight: Number(parts[8].replace(',', '')),
              })
              console.log('資料：', '鋼種: ' + parts[2] + ' 直徑: ' + parts[3] + ' 未出貨重: ' + parts[8])
            } else if (parts.length === 15) {
              tableData.value.push({
                className: parts[2],
                diameter: Number(parts[3]),
                weight: Number(parts[7].replace(',', '')),
              })
              console.log('資料：', '鋼種: ' + parts[2] + ' 直徑: ' + parts[3] + ' 未出貨重: ' + parts[7])
            }
          } else {
            // do nothing
          }
        }
      }
    }
    reader.readAsText(file)
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
