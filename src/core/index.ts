import { parse } from '@babel/parser'
import { NodePath, traverse } from '@babel/core'
import t, { MemberExpression } from '@babel/types'
import * as generator from '@babel/generator'

export function replaceNormalVariableToRef(code: string, func: Function) {
  return code.replace(/<script(.*)>([\s\S]*?)<\/script>/gm, (match, p1, p2) => {
    return `<script${p1}>\n${func(p2)}\n</script>`
  })
}

export function traverseCode(code: string) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  traverse(ast, {
    LogicalExpression(path) {
      if (path.node.operator === '??') {
        const { left, right } = path.node
        // 创建条件表达式 (test !== null && test !== undefined) ? test : new Map()
        const conditionalExpression = t.conditionalExpression(
          t.logicalExpression(
            '&&',
            t.binaryExpression('!==', left, t.nullLiteral()),
            t.binaryExpression('!==', left, t.identifier('undefined')),
          ),
          left,
          right,
        )

        // 替换原来的逻辑表达式
        path.replaceWith(conditionalExpression)
      }
    },
  })

  const result = new generator.CodeGenerator(
    ast,
    {
      jsescOption: { minimal: true },
    },
    code,
  ).generate()

  if (!result.code)
    console.error('unplugin-nullish-coalescing-operator: 转换出错')

  return result.code || ''
}

export function transformCode(code: string, isVue: boolean) {
  if (isVue)
    return replaceNormalVariableToRef(code, traverseCode)

  return traverseCode(code)
}
