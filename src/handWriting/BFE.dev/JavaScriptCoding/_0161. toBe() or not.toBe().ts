// 以下是非常简单的Jest测试代码。

// expect(3).toBe(3) // ✅
// expect(4).toBe(3) // ❌
// 我们可以通过not将其反过来。

// expect(3).not.toBe(3) // ❌
// expect(4).not.toBe(3) // ✅
// 请实现myExpect()并支持toBe()及not.

interface Matcher {
  toBe(data: any): void;
}

function myExpect(input: any): Matcher & { not: Matcher } {
  // your code here
}
