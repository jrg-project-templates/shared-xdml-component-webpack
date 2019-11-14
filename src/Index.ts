class Index {
  container: Element;

  constructor(el: string) {
    this.container = document.getElementById(el);
  }

  init() {
    this.container.innerHTML = `
      <div class="nav">
        <span>首页</span><span>详情</span><span>联系</span><span>关于</span>
      </div>`;
  }
}


export default Index;