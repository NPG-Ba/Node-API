export class Security{
    public escapeOutput(toOutput: any) {
        return toOutput
          .replace(/\&/g, "&amp;")
          .replace(/\</g, "&lt;")
          .replace(/\>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/\'/g, "&#x27")
          .replace(/\//g, "&#x2F");
      }
}