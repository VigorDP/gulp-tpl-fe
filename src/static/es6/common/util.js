const formatTime = timeStamp => {
  //timeStamp是unix时间戳
  if (timeStamp) {
    var o = new Date(timeStamp * 1000);
    return (
      o.getFullYear() + '年' + (o.getMonth() + 1) + '月' + o.getDate() + '日'
    );
  }
};

export { formatTime };
