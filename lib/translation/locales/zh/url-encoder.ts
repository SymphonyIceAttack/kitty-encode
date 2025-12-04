import type { URLEncoderModule } from "../../types";

// 中文 URL 编码器模块
export const urlEncoder: URLEncoderModule = {
  title: "免费在线URL编码器/解码器 - 即时编码URL",
  description: "免费在线编码和解码URL。非常适合API开发和Web编程。",
  subtitle:
    "我们的免费在线URL编码器/解码器帮助开发者安全地编码和解码URL，适用于Web开发、API集成和数据传输。非常适合处理特殊字符和非ASCII文本。",
  tabs: {
    encode: "URL编码器",
    decode: "URL解码器",
  },
  encode: {
    title: "编码URL",
    description: "将纯文本转换为URL编码格式（百分比编码）",
    inputText: "输入文本",
    placeholder: "输入要编码的文本（例如：Hello World! & ? # @）",
    button: "编码为URL格式",
    result: "编码结果",
  },
  decode: {
    title: "解码URL",
    description: "将URL编码格式转换回纯文本",
    inputText: "编码的URL",
    placeholder: "输入URL编码的文本（例如：Hello%20World%21）",
    button: "解码为纯文本",
    result: "解码结果",
  },
  howToUse: {
    title: "如何使用我们的URL编码器",
    steps: {
      chooseMode: {
        title: "1. 选择模式",
        description:
          '选择"URL编码器"来编码纯文本，或"URL解码器"来解码百分比编码的字符串。',
      },
      enterText: {
        title: "2. 输入您的文本",
        description:
          "粘贴或输入您想要编码/解码的文本。支持任何文本、特殊字符和Unicode。",
      },
      getResults: {
        title: "3. 获取即时结果",
        description: "点击编码/解码按钮获取结果。一键复制，便于在项目中使用。",
      },
    },
  },
  encodingVsDecoding: {
    title: "URL编码与URL解码",
    encoding: {
      title: "URL编码",
      description: "将特殊字符转换为可以在互联网上安全传输的格式。",
    },
    decoding: {
      title: "URL解码",
      description: "将百分比编码的字符串转换回其原始的可读格式。",
    },
  },
  commonExamples: {
    title: "常见URL编码示例",
    columns: {
      character: "字符",
      encoded: "URL编码",
      description: "描述",
    },
    examples: {
      space: {
        char: "空格",
        encoded: "%20",
        description: "替换文本中的空格",
      },
      ampersand: {
        char: "&",
        encoded: "%26",
        description: "分隔URL参数",
      },
      question: {
        char: "?",
        encoded: "%3F",
        description: "开始查询字符串",
      },
      hash: {
        char: "#",
        encoded: "%23",
        description: "URL片段标识符",
      },
      plus: {
        char: "+",
        encoded: "%2B",
        description: "URL中的加号",
      },
      chinese: {
        char: "中文",
        encoded: "%E4%B8%AD%E6%96%87",
        description: "非ASCII字符",
      },
    },
  },
  faq: {
    title: "常见问题",
    url: {
      secure: {
        question: "URL编码安全吗？",
        answer:
          "是的，URL编码是完全安全的。它只是将特殊字符转换为可以在互联网上安全传输的标准格式。我们不会在服务器上存储或处理任何数据。",
      },
      why: {
        question: "为什么需要URL编码？",
        answer:
          "当您想要在URL中包含特殊字符、空格或非ASCII文本时，URL编码是必要的。它确保Web浏览器和服务器能够正确解释URL而不产生错误。",
      },
      chinese: {
        question: "可以编码中文字符吗？",
        answer:
          "可以！我们的URL编码器可以处理中文字符和其他Unicode文本。它们会被正确编码，以确保在URL中正常工作。",
      },
      api: {
        question: "可以用于API开发吗？",
        answer:
          "当然可以！URL编码对于API开发来说至关重要，特别是在通过GET请求发送数据或在URL中包含参数时。",
      },
      difference: {
        question: "编码和解码有什么区别？",
        answer:
          "编码将纯文本转换为URL编码格式（如'Hello World'转换为'Hello%20World'），而解码将URL编码的文本转换回纯文本。",
      },
    },
    qr: {
      what: {
        question: "什么是二维码？",
        answer:
          "二维码（Quick Response Code）是一种二维条码，可以存储各种类型的数据，包括URL、文本、电话号码等。它广泛用于营销、支付和信息分享。",
      },
      types: {
        question: "我可以创建哪些类型的二维码？",
        answer:
          "您可以为文本、URL、电子邮件地址、电话号码、WiFi凭据等创建二维码。我们的生成器支持多种数据格式以满足不同需求。",
      },
      secure: {
        question: "二维码安全吗？",
        answer:
          "二维码本身是安全的，但在扫描前请务必验证来源。避免扫描来自未知或可疑来源的二维码，因为它们可能会引导到恶意网站。",
      },
      custom: {
        question: "可以自定义二维码吗？",
        answer:
          "是的，您可以自定义二维码的颜色、徽标和样式，同时保持可扫描性。但是，请确保对比度足够以便可靠扫描。",
      },
      benefits: {
        question: "使用二维码有什么好处？",
        answer:
          "二维码提供快速数据传输、离线可访问性、成本效益的打印，以及与智能手机和扫描应用程序的广泛兼容性。",
      },
    },
    base64: {
      secure: {
        question: "Base64编码安全吗？",
        answer:
          "Base64是一种编码方法，不是加密。它将二进制数据转换为ASCII文本以便安全传输。虽然编码后的数据看起来模糊，但任何人都可以轻松解码。",
      },
      encoding: {
        question: "Base64编码用于什么？",
        answer:
          "Base64编码通常用于将二进制数据嵌入基于文本的格式，如JSON、XML或电子邮件。它对于数据传输和API开发至关重要。",
      },
      decode: {
        question: "如何解码Base64？",
        answer:
          "只需将Base64编码字符串粘贴到解码器中，然后点击解码。原始数据将显示在输出字段中。",
      },
      urlsafe: {
        question: "什么是URL安全的Base64？",
        answer:
          "URL安全的Base64分别用-和_替换+和/字符，使其在URL中安全使用，无需额外编码。",
      },
      binary: {
        question: "Base64可以编码二进制文件吗？",
        answer:
          "是的，Base64可以编码任何二进制数据，包括图像、文档和可执行文件。但是，编码后的文件将比原始文件大约33%。",
      },
    },
    regex: {
      what: {
        question: "什么是正则表达式？",
        answer:
          "正则表达式（regex）是一种用于匹配和操作文本的模式。它提供强大的文本搜索、验证和替换功能。",
      },
      common: {
        question: "什么是常见的正则表达式模式？",
        answer:
          "常见模式包括电子邮件验证、URL匹配、电话号码格式化和日期验证。我们的示例展示了实用的regex用法。",
      },
      flags: {
        question: "regex标志是什么意思？",
        answer:
          "标志修改regex行为：g（全局），i（不区分大小写），m（多行），s（dotAll），u（unicode），y（粘性）。每个标志都会影响模式如何匹配文本。",
      },
      test: {
        question: "如何测试我的regex？",
        answer:
          "输入您的regex模式和测试文本，然后点击'Test Regex'。该工具将高亮显示匹配项并显示详细结果，包括匹配位置和组。",
      },
      performance: {
        question: "为什么我的regex很慢？",
        answer:
          "复杂或编写不当的regex模式可能导致性能问题。避免嵌套量词，并在可能的情况下使用原子分组以获得更好的性能。",
      },
    },
    colorPalette: {
      secure: {
        question: "调色板生成是如何工作的？",
        answer:
          "我们的工具使用色彩理论算法来生成和谐的色彩组合。它分析色彩关系并生成视觉上协调的调色板。",
      },
      algorithm: {
        question: "使用什么算法？",
        answer:
          "我们使用经过验证的色彩和谐算法，包括基于色轮理论的互补、类似和三色调色板。",
      },
      harmony: {
        question: "什么是色彩和谐？",
        answer:
          "色彩和谐指的是令人愉悦的色彩排列。我们的工具创建在视觉上相互补充的调色板。",
      },
      export: {
        question: "如何使用生成的调色板？",
        answer:
          "将调色板导出为JSON、CSS变量或复制个别颜色。在设计软件、网站或任何需要色彩协调的项目中使用它们。",
      },
      accessibility: {
        question: "颜色是否易于访问？",
        answer:
          "虽然我们的调色板设计用于视觉吸引力，但始终测试颜色对比度以确保可访问性合规性，特别是对于文本可读性。",
      },
    },
    hash: {
      secure: {
        question: "生成的哈希安全吗？",
        answer:
          "哈希生成完全在您的浏览器中进行 - 不会向我们的服务器发送任何数据。但是，永远不要使用在线哈希生成器处理密码等敏感数据。",
      },
      algorithms: {
        question: "有哪些哈希算法可用？",
        answer:
          "我们支持MD5、SHA-1、SHA-256、SHA-512和其他常见算法。每个都有不同的安全级别和用例。",
      },
      reversible: {
        question: "哈希可以反向计算吗？",
        answer:
          "不，密码哈希是单向函数。您无法反向计算哈希来获取原始输入。这是为了安全而设计的。",
      },
      collision: {
        question: "什么是哈希碰撞？",
        answer:
          "当两个不同的输入产生相同的哈希时，就会发生碰撞。像SHA-256这样的现代算法使碰撞极不可能发生。",
      },
      passwords: {
        question: "我应该用这些工具哈希密码吗？",
        answer:
          "不，永远不要使用在线工具哈希密码。使用带有盐和适当算法（如bcrypt或Argon2）的适当密码哈希库。",
      },
    },
    json: {
      secure: {
        question: "我的JSON数据安全吗？",
        answer:
          "是的，所有处理都在您的浏览器中进行。不会向我们的服务器发送任何数据，确保您的JSON数据的完整隐私和安全性。",
      },
      format: {
        question: "JSON格式化是如何工作的？",
        answer:
          "JSON格式化添加适当的缩进和换行以使代码可读。它还验证语法并突出显示任何错误。",
      },
      minify: {
        question: "什么是JSON压缩？",
        answer:
          "压缩删除不必要的空白和格式以减小文件大小，提高Web应用程序的加载速度。",
      },
      validate: {
        question: "验证是如何工作的？",
        answer:
          "我们的验证器检查JSON语法、数据类型和结构。它提供带有行号的详细错误消息以便轻松调试。",
      },
      large: {
        question: "可以处理大型JSON文件吗？",
        answer:
          "是的，我们的工具可以高效处理大型JSON文件。对于极大的文件，请考虑使用本地工具或代码编辑器以获得更好的性能。",
      },
    },
    sql: {
      format: {
        question: "SQL格式化是如何工作的？",
        answer:
          "SQL格式化添加适当的缩进、换行和间距以使查询可读。它还包括基本语法验证。",
      },
      dialects: {
        question: "支持哪些SQL方言？",
        answer:
          "我们的格式化器适用于MySQL、PostgreSQL、SQLite和其他主要数据库使用的标准SQL语法。方言特定功能可能不完全支持。",
      },
      customize: {
        question: "可以自定义格式化吗？",
        answer:
          "格式化器对缩进和间距使用一致的规则。虽然自定义选项有限，但输出遵循SQL最佳实践。",
      },
      validate: {
        question: "验证有多彻底？",
        answer:
          "验证包括基本语法检查，如括号匹配、引号处理和关键字识别。复杂验证需要数据库特定的解析器。",
      },
      performance: {
        question: "格式化可以提高查询性能吗？",
        answer:
          "格式化提高可读性但不影响查询执行速度。性能取决于数据库优化、索引和查询结构。",
      },
    },
  },
  relatedTools: {
    title: "相关工具",
    jwtDecoder: {
      title: "JWT解码器",
      description: "在线解码和验证JWT令牌",
    },
    jsonFormatter: {
      title: "JSON格式化器",
      description: "格式化和验证JSON数据",
    },
    base64Encoder: {
      title: "Base64编码器",
      description: "编码和解码Base64字符串",
    },
  },
  ui: {
    tryButton: "立即尝试",
    clearButton: "清除",
    errorEncode: "编码文本失败",
    errorDecode: "解码URL失败",
    copySuccess: "已复制到剪贴板！",
  },
};
