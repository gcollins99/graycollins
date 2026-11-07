// Renders window.BIO_TEXT (defined in bio.js) into the #bio element.
// Format: paragraphs separated by a blank line; links as [text](url);
// **bold** and *italic*.
(function () {
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function render(text) {
    return text
      .trim()
      .split(/\n\s*\n/)
      .map(function (p) {
        var html = escapeHtml(p.trim()).replace(
          /\[([^\]]+)\]\(([^)\s]+)\)/g,
          function (_, label, url) {
            var external = /^https?:/.test(url) ? ' target="_blank"' : "";
            return '<a href="' + url + '"' + external + ">" + label + "</a>";
          }
        );
        html = html
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.+?)\*/g, "<em>$1</em>");
        return "<p>" + html + "</p>";
      })
      .join("");
  }

  var el = document.getElementById("bio");
  if (typeof window.BIO_TEXT !== "string") {
    el.textContent = "Could not load bio.js.";
    return;
  }
  el.innerHTML = render(window.BIO_TEXT);
  if (window.applyStyles) window.applyStyles(); // restyle the new links
})();
