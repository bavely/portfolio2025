import htmltemplate from "@/app/contactme/html";
import { escapeHtml } from "@/lib/escape-html";

describe("HTML escaping", () => {
  it("escapes every significant HTML character", () => {
    expect(escapeHtml(`<script data-name="x">Tom & Jerry's</script>`)).toBe(
      "&lt;script data-name=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/script&gt;",
    );
  });

  it("does not interpolate executable markup into acknowledgement emails", () => {
    const html = htmltemplate(`<img src=x onerror="alert(1)">`);

    expect(html).not.toContain(`<img src=x onerror="alert(1)">`);
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });
});
