import {
  
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,

} from "@medusajs/framework/workflows-sdk"

// const orderPlaced = createStep(
//   "order-placed", 
//   async () => {
//     return new StepResponse(`Hello from step one!`)
//   }
// )

type WorkflowInput = {
  name: string
}

// const step2 = createStep(
//   "step-2", 
//   async ({ name }: WorkflowInput) => {
//     return new StepResponse(`Hello ${name} from step two!`)
//   }
// )


// // ...

const sendOrderConfirmationWorkflow = createWorkflow(
  "order-placed",
  function (input: WorkflowInput) {
    

    return new WorkflowResponse(
        {
            "console.log('workflow moving')"
            
        }
    )
  }
)

export default myWorkflow