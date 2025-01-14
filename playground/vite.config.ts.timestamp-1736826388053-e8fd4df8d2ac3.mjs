// vite.config.ts
import { defineConfig } from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/vite@4.5.5_@types+node@20.10.3_terser@5.17.7/node_modules/vite/dist/node/index.js";
import Inspect from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/vite-plugin-inspect@0.7.42_@nuxt+kit@3.8.2_rollup@4.6.1__rollup@4.6.1_vite@4.5.5_@types+node@20.10.3_terser@5.17.7_/node_modules/vite-plugin-inspect/dist/index.mjs";
import Vue from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.5_@types+node@20.10.3_terser@5.17.7__vue@3.5.13_typescript@5.3.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// ../src/vite.ts
import { createVitePlugin } from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/unplugin@1.5.1/node_modules/unplugin/dist/index.mjs";

// ../src/index.ts
import { createUnplugin } from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/unplugin@1.5.1/node_modules/unplugin/dist/index.mjs";

// ../src/core/index.ts
import { parse } from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/@babel+parser@7.21.5/node_modules/@babel/parser/lib/index.js";
import { traverse } from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/@babel+core@7.21.5/node_modules/@babel/core/lib/index.js";
import t from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/@babel+types@7.22.10/node_modules/@babel/types/lib/index.js";
import * as generator from "file:///Users/rim/Documents/test/unplugin-nullish-coalescing-operator/node_modules/.pnpm/@babel+generator@7.22.10/node_modules/@babel/generator/lib/index.js";
function replaceNormalVariableToRef(code, func) {
  return code.replace(/<script .*>([\s\S]*?)<\/script>/gm, (match, p1) => {
    return `<script lang="ts" setup>
${func(p1)}
</script>`;
  });
}
function traverseCode(code) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript"]
  });
  traverse(ast, {
    LogicalExpression(path) {
      if (path.node.operator === "??") {
        const { left, right } = path.node;
        const conditionalExpression = t.conditionalExpression(
          t.logicalExpression(
            "&&",
            t.binaryExpression("!==", left, t.nullLiteral()),
            t.binaryExpression("!==", left, t.identifier("undefined"))
          ),
          left,
          right
        );
        path.replaceWith(conditionalExpression);
      }
    }
  });
  const result = new generator.CodeGenerator(
    ast,
    {
      jsescOption: { minimal: true }
    },
    code
  ).generate();
  if (!result.code)
    console.error("unplugin-nullish-coalescing-operator: \u8F6C\u6362\u51FA\u9519");
  return result.code || "";
}
function transformCode(code, isVue) {
  if (isVue)
    return replaceNormalVariableToRef(code, traverseCode);
  return traverseCode(code);
}

// ../src/index.ts
var unpluginFactory = (options) => ({
  name: "unplugin-nullish-coalescing-operator",
  enforce: "post",
  transformInclude(id) {
    if (options) {
      const { fileNames } = options;
      if (fileNames) {
        if (typeof fileNames === "string")
          return id.includes(fileNames);
        if (Array.isArray(fileNames))
          return fileNames.findIndex((name) => id.includes(name)) !== -1;
      }
    }
    return id.includes(".ts") || id.includes(".vue");
  },
  transform(code, id) {
    return transformCode(code, id.includes(".vue"));
  }
});

// ../src/vite.ts
var vite_default = createVitePlugin(unpluginFactory);

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    vite_default()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vc3JjL3ZpdGUudHMiLCAiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jb3JlL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JpbS9Eb2N1bWVudHMvdGVzdC91bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3IvcGxheWdyb3VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JpbS9Eb2N1bWVudHMvdGVzdC91bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3IvcGxheWdyb3VuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9wbGF5Z3JvdW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBVbnBsdWdpbiBmcm9tICcuLi9zcmMvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZSgpLFxuICAgIEluc3BlY3QoKSxcbiAgICBVbnBsdWdpbigpLFxuICBdLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JpbS9Eb2N1bWVudHMvdGVzdC91bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3Ivc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9zcmMvdml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9zcmMvdml0ZS50c1wiO2ltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW4gfSBmcm9tICd1bnBsdWdpbidcbmltcG9ydCB7IHVucGx1Z2luRmFjdG9yeSB9IGZyb20gJy4nXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVZpdGVQbHVnaW4odW5wbHVnaW5GYWN0b3J5KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yaW0vRG9jdW1lbnRzL3Rlc3QvdW5wbHVnaW4tbnVsbGlzaC1jb2FsZXNjaW5nLW9wZXJhdG9yL3NyYy9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9zcmMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFVucGx1Z2luRmFjdG9yeSB9IGZyb20gJ3VucGx1Z2luJ1xuaW1wb3J0IHsgY3JlYXRlVW5wbHVnaW4gfSBmcm9tICd1bnBsdWdpbidcbmltcG9ydCB0eXBlIHsgT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyB0cmFuc2Zvcm1Db2RlIH0gZnJvbSAnLi9jb3JlJ1xuXG5leHBvcnQgY29uc3QgdW5wbHVnaW5GYWN0b3J5OiBVbnBsdWdpbkZhY3Rvcnk8T3B0aW9ucyB8IHVuZGVmaW5lZD4gPSBvcHRpb25zID0+ICh7XG4gIG5hbWU6ICd1bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3InLFxuICBlbmZvcmNlOiAncG9zdCcsXG4gIHRyYW5zZm9ybUluY2x1ZGUoaWQpIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgY29uc3QgeyBmaWxlTmFtZXMgfSA9IG9wdGlvbnNcbiAgICAgIGlmIChmaWxlTmFtZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWxlTmFtZXMgPT09ICdzdHJpbmcnKVxuICAgICAgICAgIHJldHVybiBpZC5pbmNsdWRlcyhmaWxlTmFtZXMpXG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZU5hbWVzKSlcbiAgICAgICAgICByZXR1cm4gZmlsZU5hbWVzLmZpbmRJbmRleChuYW1lID0+IGlkLmluY2x1ZGVzKG5hbWUpKSAhPT0gLTFcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkLmluY2x1ZGVzKCcudHMnKSB8fCBpZC5pbmNsdWRlcygnLnZ1ZScpXG4gIH0sXG4gIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm1Db2RlKGNvZGUsIGlkLmluY2x1ZGVzKCcudnVlJykpXG4gIH0sXG59KVxuXG5leHBvcnQgY29uc3QgdW5wbHVnaW4gPSAvKiAjX19QVVJFX18gKi8gY3JlYXRlVW5wbHVnaW4odW5wbHVnaW5GYWN0b3J5KVxuXG5leHBvcnQgZGVmYXVsdCB1bnBsdWdpblxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmltL0RvY3VtZW50cy90ZXN0L3VucGx1Z2luLW51bGxpc2gtY29hbGVzY2luZy1vcGVyYXRvci9zcmMvY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JpbS9Eb2N1bWVudHMvdGVzdC91bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3Ivc3JjL2NvcmUvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JpbS9Eb2N1bWVudHMvdGVzdC91bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3Ivc3JjL2NvcmUvaW5kZXgudHNcIjtpbXBvcnQgeyBwYXJzZSB9IGZyb20gJ0BiYWJlbC9wYXJzZXInXG5pbXBvcnQgeyBOb2RlUGF0aCwgdHJhdmVyc2UgfSBmcm9tICdAYmFiZWwvY29yZSdcbmltcG9ydCB0LCB7IE1lbWJlckV4cHJlc3Npb24gfSBmcm9tICdAYmFiZWwvdHlwZXMnXG5pbXBvcnQgKiBhcyBnZW5lcmF0b3IgZnJvbSAnQGJhYmVsL2dlbmVyYXRvcidcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOb3JtYWxWYXJpYWJsZVRvUmVmKGNvZGU6IHN0cmluZywgZnVuYzogRnVuY3Rpb24pIHtcbiAgcmV0dXJuIGNvZGUucmVwbGFjZSgvPHNjcmlwdCAuKj4oW1xcc1xcU10qPyk8XFwvc2NyaXB0Pi9nbSwgKG1hdGNoLCBwMSkgPT4ge1xuICAgIHJldHVybiBgPHNjcmlwdCBsYW5nPVwidHNcIiBzZXR1cD5cXG4ke2Z1bmMocDEpfVxcbjwvc2NyaXB0PmBcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQ29kZShjb2RlOiBzdHJpbmcpIHtcbiAgY29uc3QgYXN0ID0gcGFyc2UoY29kZSwge1xuICAgIHNvdXJjZVR5cGU6ICdtb2R1bGUnLFxuICAgIHBsdWdpbnM6IFsndHlwZXNjcmlwdCddLFxuICB9KVxuICB0cmF2ZXJzZShhc3QsIHtcbiAgICBMb2dpY2FsRXhwcmVzc2lvbihwYXRoKSB7XG4gICAgICBpZiAocGF0aC5ub2RlLm9wZXJhdG9yID09PSAnPz8nKSB7XG4gICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQgfSA9IHBhdGgubm9kZVxuICAgICAgICAvLyBcdTUyMUJcdTVFRkFcdTY3NjFcdTRFRjZcdTg4NjhcdThGQkVcdTVGMEYgKHRlc3QgIT09IG51bGwgJiYgdGVzdCAhPT0gdW5kZWZpbmVkKSA/IHRlc3QgOiBuZXcgTWFwKClcbiAgICAgICAgY29uc3QgY29uZGl0aW9uYWxFeHByZXNzaW9uID0gdC5jb25kaXRpb25hbEV4cHJlc3Npb24oXG4gICAgICAgICAgdC5sb2dpY2FsRXhwcmVzc2lvbihcbiAgICAgICAgICAgICcmJicsXG4gICAgICAgICAgICB0LmJpbmFyeUV4cHJlc3Npb24oJyE9PScsIGxlZnQsIHQubnVsbExpdGVyYWwoKSksXG4gICAgICAgICAgICB0LmJpbmFyeUV4cHJlc3Npb24oJyE9PScsIGxlZnQsIHQuaWRlbnRpZmllcigndW5kZWZpbmVkJykpLFxuICAgICAgICAgICksXG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICByaWdodCxcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIFx1NjZGRlx1NjM2Mlx1NTM5Rlx1Njc2NVx1NzY4NFx1OTAzQlx1OEY5MVx1ODg2OFx1OEZCRVx1NUYwRlxuICAgICAgICBwYXRoLnJlcGxhY2VXaXRoKGNvbmRpdGlvbmFsRXhwcmVzc2lvbilcbiAgICAgIH1cbiAgICB9LFxuICB9KVxuXG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBnZW5lcmF0b3IuQ29kZUdlbmVyYXRvcihcbiAgICBhc3QsXG4gICAge1xuICAgICAganNlc2NPcHRpb246IHsgbWluaW1hbDogdHJ1ZSB9LFxuICAgIH0sXG4gICAgY29kZSxcbiAgKS5nZW5lcmF0ZSgpXG5cbiAgaWYgKCFyZXN1bHQuY29kZSlcbiAgICBjb25zb2xlLmVycm9yKCd1bnBsdWdpbi1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3I6IFx1OEY2Q1x1NjM2Mlx1NTFGQVx1OTUxOScpXG5cbiAgcmV0dXJuIHJlc3VsdC5jb2RlIHx8ICcnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1Db2RlKGNvZGU6IHN0cmluZywgaXNWdWU6IGJvb2xlYW4pIHtcbiAgaWYgKGlzVnVlKVxuICAgIHJldHVybiByZXBsYWNlTm9ybWFsVmFyaWFibGVUb1JlZihjb2RlLCB0cmF2ZXJzZUNvZGUpXG5cbiAgcmV0dXJuIHRyYXZlcnNlQ29kZShjb2RlKVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLG9CQUFvQjtBQUMxYSxPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTOzs7QUNGMFYsU0FBUyx3QkFBd0I7OztBQ0MzWSxTQUFTLHNCQUFzQjs7O0FDRDRWLFNBQVMsYUFBYTtBQUNqWixTQUFtQixnQkFBZ0I7QUFDbkMsT0FBTyxPQUE2QjtBQUNwQyxZQUFZLGVBQWU7QUFFcEIsU0FBUywyQkFBMkIsTUFBYyxNQUFnQjtBQUN2RSxTQUFPLEtBQUssUUFBUSxxQ0FBcUMsQ0FBQyxPQUFPLE9BQU87QUFDdEUsV0FBTztBQUFBLEVBQTZCLEtBQUssRUFBRSxDQUFDO0FBQUE7QUFBQSxFQUM5QyxDQUFDO0FBQ0g7QUFFTyxTQUFTLGFBQWEsTUFBYztBQUN6QyxRQUFNLE1BQU0sTUFBTSxNQUFNO0FBQUEsSUFDdEIsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLFlBQVk7QUFBQSxFQUN4QixDQUFDO0FBQ0QsV0FBUyxLQUFLO0FBQUEsSUFDWixrQkFBa0IsTUFBTTtBQUN0QixVQUFJLEtBQUssS0FBSyxhQUFhLE1BQU07QUFDL0IsY0FBTSxFQUFFLE1BQU0sTUFBTSxJQUFJLEtBQUs7QUFFN0IsY0FBTSx3QkFBd0IsRUFBRTtBQUFBLFVBQzlCLEVBQUU7QUFBQSxZQUNBO0FBQUEsWUFDQSxFQUFFLGlCQUFpQixPQUFPLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFBQSxZQUMvQyxFQUFFLGlCQUFpQixPQUFPLE1BQU0sRUFBRSxXQUFXLFdBQVcsQ0FBQztBQUFBLFVBQzNEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBR0EsYUFBSyxZQUFZLHFCQUFxQjtBQUFBLE1BQ3hDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sU0FBUyxJQUFjO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsTUFDRSxhQUFhLEVBQUUsU0FBUyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxJQUNBO0FBQUEsRUFDRixFQUFFLFNBQVM7QUFFWCxNQUFJLENBQUMsT0FBTztBQUNWLFlBQVEsTUFBTSxnRUFBNEM7QUFFNUQsU0FBTyxPQUFPLFFBQVE7QUFDeEI7QUFFTyxTQUFTLGNBQWMsTUFBYyxPQUFnQjtBQUMxRCxNQUFJO0FBQ0YsV0FBTywyQkFBMkIsTUFBTSxZQUFZO0FBRXRELFNBQU8sYUFBYSxJQUFJO0FBQzFCOzs7QURuRE8sSUFBTSxrQkFBd0QsY0FBWTtBQUFBLEVBQy9FLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULGlCQUFpQixJQUFJO0FBQ25CLFFBQUksU0FBUztBQUNYLFlBQU0sRUFBRSxVQUFVLElBQUk7QUFDdEIsVUFBSSxXQUFXO0FBQ2IsWUFBSSxPQUFPLGNBQWM7QUFDdkIsaUJBQU8sR0FBRyxTQUFTLFNBQVM7QUFFOUIsWUFBSSxNQUFNLFFBQVEsU0FBUztBQUN6QixpQkFBTyxVQUFVLFVBQVUsVUFBUSxHQUFHLFNBQVMsSUFBSSxDQUFDLE1BQU07QUFBQSxNQUM5RDtBQUFBLElBQ0Y7QUFDQSxXQUFPLEdBQUcsU0FBUyxLQUFLLEtBQUssR0FBRyxTQUFTLE1BQU07QUFBQSxFQUNqRDtBQUFBLEVBQ0EsVUFBVSxNQUFNLElBQUk7QUFDbEIsV0FBTyxjQUFjLE1BQU0sR0FBRyxTQUFTLE1BQU0sQ0FBQztBQUFBLEVBQ2hEO0FBQ0Y7OztBRHJCQSxJQUFPLGVBQVEsaUJBQWlCLGVBQWU7OztBREUvQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixRQUFRO0FBQUEsSUFDUixhQUFTO0FBQUEsRUFDWDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
