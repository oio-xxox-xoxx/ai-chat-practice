const { NlpManager } = require("node-nlp");
const docs = require("./Doc.json");
const ans = require("./Ans.json");
const manager = new NlpManager({ languages: ["ko"], forceNER: true });

for (const v of docs) {
  manager.addDocument("ko", v.text, v.intent);
}

for (const a of ans) {
  manager.addAnswer("ko", a.intent, a.text);
}

(async () => {
  await manager.train();
  manager.save();
  const response = await manager.process("ko", "배고프넹");
  console.log(response);
})();
