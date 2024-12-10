function extractKeys() {
  const keys = {
    AccessKeyId: null,
    AccessKeySecret: null,
    SecurityToken: null,
  };

  try {
    // 获取页面中的 JSON 文本内容
    const bodyText = document.body.innerText.trim();

    // 尝试解析 JSON 数据
    const jsonData = JSON.parse(bodyText);

    // 提取需要的键值
    keys.AccessKeyId = jsonData.AccessKeyId || "未找到";
    keys.AccessKeySecret = jsonData.AccessKeySecret || "未找到";
    keys.SecurityToken = jsonData.SecurityToken || "未找到";
  } catch (error) {
    console.error("解析页面 JSON 出错，可能页面不包含目标数据：", error);
    return; // 如果无法解析为 JSON，则退出
  }

  // 创建 UI 并显示提取结果
  const container = document.createElement("div");
  container.id = "access-key-extractor";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.backgroundColor = "#fff";
  container.style.border = "1px solid #ccc";
  container.style.padding = "10px";
  container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  container.style.zIndex = 10000;
  container.style.fontSize = "14px";
  container.style.width = "320px";

  container.innerHTML = `
    <div>
      <label>AccessKeyId:</label>
      <input type="text" id="access-key-id" value="${keys.AccessKeyId}" readonly style="width: 200px;">
      <button id="copy-access-key-id">复制</button>
    </div>
    <div>
      <label>AccessKeySecret:</label>
      <input type="text" id="access-key-secret" value="${keys.AccessKeySecret}" readonly style="width: 200px;">
      <button id="copy-access-key-secret">复制</button>
    </div>
    <div>
      <label>SecurityToken:</label>
      <input type="text" id="security-token" value="${keys.SecurityToken}" readonly style="width: 200px;">
      <button id="copy-security-token">复制</button>
    </div>
  `;

  // 如果之前已经添加了容器，先移除旧容器
  const existingContainer = document.getElementById("access-key-extractor");
  if (existingContainer) {
    existingContainer.remove();
  }

  // 添加新容器到页面
  document.body.appendChild(container);

  // 添加复制按钮的点击事件
  document.getElementById("copy-access-key-id").addEventListener("click", () => {
    const text = document.getElementById("access-key-id").value;
    copyToClipboard(text);
  });

  document.getElementById("copy-access-key-secret").addEventListener("click", () => {
    const text = document.getElementById("access-key-secret").value;
    copyToClipboard(text);
  });

  document.getElementById("copy-security-token").addEventListener("click", () => {
    const text = document.getElementById("security-token").value;
    copyToClipboard(text);
  });
}

// 复制到剪贴板的函数
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("复制成功：", text);
    },
    (err) => {
      console.log("复制失败：", err);
    }
  );
}

// 等待页面完全加载后运行脚本
window.addEventListener("load", extractKeys);
