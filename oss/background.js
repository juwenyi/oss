// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log("AccessKey 提取器插件已安装！");
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "log") {
    console.log("来自 content script 的消息:", message.data);
    sendResponse({ status: "received" });
  }
});
