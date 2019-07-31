function InjectRowSelect(target) {
  const { setState } = target.prototype
  target.prototype.rowSelectHandle = function (callbackData) {
    setState.call(this, {
      selectedRowKeys: callbackData.selectedRowKeys,
      selectRows: callbackData.selectedRows
    })
  }
  return target
}
export default InjectRowSelect
