function splitExplanationAndCode(rawData:any) {
    const result = {
      explanation: "",
      code: ""
    };
  
    try {
      // Extract explanation from <think>...</think> or before code
      const thinkMatch = rawData.match(/<think>([\s\S]*?)<\/think>/i);
      if (thinkMatch) {
        result.explanation = thinkMatch[1].trim();
      } else {
        // fallback: take everything before first ``` block
        const index = rawData.indexOf("```");
        result.explanation = index !== -1 ? rawData.slice(0, index).trim() : rawData.trim();
      }
  
      // Extract first code block
      const codeMatch = rawData.match(/```(?:\w*\n)?([\s\S]*?)```/);
      if (codeMatch) {
        result.code = codeMatch[1].trim();
      }
  
      return result;
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      return result;
    }
  }
  

export default splitExplanationAndCode;   