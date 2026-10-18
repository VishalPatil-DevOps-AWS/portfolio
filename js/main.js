(function () {
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  /* Theme toggle (remembered when storage is available) */
  $("theme").addEventListener("click", function () {
    var dark = getComputedStyle(root).getPropertyValue("--bg").trim() === "#0C1624";
    var next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* Mobile menu */
  var menu = $("menu"), burger = $("burger");
  function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* Highlight current section in nav */
  var links = [].slice.call(menu.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) io.observe(s); });
  }

  /* Interactive AWS diagram */
  var st = { stop: false, cpu: false };
  var bStop = $("b-stop"), bCpu = $("b-cpu");
  function cls(el, c, on) { el.classList.toggle(c, on); }
  function line(id, mode) {
    var el = $(id);
    el.setAttribute("class", mode || "");
  }
  function render() {
    cls($("ec2b"), "down", st.stop);
    cls($("ec2a"), "hot", st.cpu);
    cls($("cw"), "hot", st.cpu);
    cls($("mail"), "ok", st.cpu);
    $("tb").textContent = st.stop ? "stopped" : "healthy";
    $("ta").textContent = st.cpu ? "CPU high" : "healthy";
    $("tcw").textContent = st.cpu ? "alarm triggered" : "CPU normal";
    $("tmail").textContent = st.cpu ? "alert sent" : "no alerts";
    line("l-ua", "flow");
    line("l-a", "flow");
    line("l-b", st.stop ? "off" : "flow");
    line("l-sns", st.cpu ? "alert" : "");
    line("l-mail", st.cpu ? "alert" : "");
    bStop.setAttribute("aria-pressed", String(st.stop));
    bCpu.setAttribute("aria-pressed", String(st.cpu));
    bStop.textContent = st.stop ? "Start EC2-B" : "Stop EC2-B";
    var msg = [];
    msg.push(st.stop ? "EC2-B failed its health check, so the load balancer sends all traffic to EC2-A." : "Traffic is shared across both instances.");
    if (st.cpu) msg.push("EC2-A CPU crossed the threshold: CloudWatch raised an alarm and SNS emailed a notification.");
    $("status").textContent = msg.join(" ");
  }
  bStop.addEventListener("click", function () { st.stop = !st.stop; render(); });
  bCpu.addEventListener("click", function () { st.cpu = !st.cpu; render(); });
  $("b-reset").addEventListener("click", function () { st.stop = st.cpu = false; render(); });
  render();

  /* Contact form: opens the visitor's email app with the message filled in */
  var form = $("form");
  [].forEach.call(form.elements, function (f) {
    f.addEventListener("blur", function () { f.classList.add("touched"); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("fmsg");
    if (!form.checkValidity()) {
      [].forEach.call(form.elements, function (f) { f.classList.add("touched"); });
      msg.textContent = "Please fill in your name, a valid email and a message.";
      return;
    }
    var d = new FormData(form);
    var body = d.get("msg") + "\n\nFrom: " + d.get("name") + " (" + d.get("email") + ")";
    window.location.href = "mailto:vp228459@gmail.com?subject=" +
      encodeURIComponent("Portfolio enquiry from " + d.get("name")) + "&body=" + encodeURIComponent(body);
    msg.textContent = "Opening your email app. If nothing opens, write to vp228459@gmail.com.";
  });

  $("yr").textContent = new Date().getFullYear();
})();
