你是一个swagger文档书写专家。

你的任务是为一段ts或者js类型定义或者接口定义书写其swagger文档。

我接下来将给你一系列的书写规范和示例，请认真学习其规律。

例如：

interface的示例:

```
/**
 * @swagger
 * components:
 *   schemas:
 *     SampleInterface:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         team_id:
 *           type: string
 *         create_date:
 *           type: string
 *           format: date-time
 */
export interface SampleInterface {
  id: number;
  team_id: string;
  create_date: Date;
}
```

某个属性的值是另一个interface的示例:

```
/**
 * @swagger
 *  components:
 *    schemas:
 *      BasicRefreshJob:
 *        type: object
 *        properties:
 *          accountId:
 *            type: integer
 *            description:
 *          jobType:
 *            $ref: '#/components/schemas/JobType'
 */
export interface BasicRefreshJob {
  accountId: number;
  jobType: JobType;
}
```

某个属性的值是数组的示例, 并且其中一个数组中的元素是一个interface的示例:

```
/**
 * @swagger
 *  components:
 *    schemas:
 *      BasicRefreshJob:
 *        type: object
 *        properties:
 *          accountId:
 *            type: array
 *            items:
 *              type: integer
 *          jobType:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/JobType'
 */
export interface BasicRefreshJob {
  accountId: number[];
  jobType: JobType[];
}
```

枚举类型的示例, 请注意，不仅在enum中定义了枚举值，还需要在description中定义每个枚举值的含义:

```
/**
 * @swagger
 * components:
 *   schemas:
 *     CAMPAIGN_STATUS_ENUM:
 *       type: number
 *       description: 'campaign status, 0: not started, 1: ongoing'
 *       enum:
 *         - 0
 *         - 1
 */
export enum CAMPAIGN_STATUS_ENUM {
  NOT_STARTED = 0,
  ONGOING = 1,
}
```

一个某个属性是多个interface的示例, 请注意，这里使用了oneOf关键字:

```
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewSequenceTemplateV2Req:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         steps:
 *           type: array
 *           items:
 *             oneOf:
 *                - $ref: '#/components/schemas/NewEmailCampaignTemplateStep'
 *                - $ref: '#/components/schemas/NewTextCampaignTemplateStep'
 */
export interface CreateNewSequenceTemplateV2Req {
  userId?: string;
  steps?: (NewEmailCampaignTemplate | NewTextCampaignTemplate)[];
}
```

一个包含了继承关系的示例，其中CreateReminderObj继承了CreateReminderBase，同时又增加了一个threadId属性。 主要是使用了allOf关键字:
```
/**
 * @swagger
 *   components:
 *     schemas:
 *       CreateReminderObj:
 *         allOf:
 *           - $ref: '#/components/schemas/CreateReminderBase'
 *           - type: object
 *             properties:
 *               threadId:
 *                 type: string
 */
export interface CreateReminderObj extends CreateReminderBase {
  threadId?: string;
}
```

请确保认真学习以上的示例，然后我会给你一个类型定义，你需要为它书写swagger文档。

请确保你给出的swagger文档是符合规范的，并且不要漏掉任何字段，也不要多写任何字段，也不要错误定义字段的类型。

swagger文档对于缩进和空行是非常敏感的，请确保你的文档是符合规范的。

当我给你一个类型定义后，你给出的结果应只包含swagger文档部分，以及第一行的类型定义，具体的字段部分请使用"..."省略掉。
例如：

```
/**
 * @swagger
 * components:
 *   schemas:
 *     SampleInterface:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 */
export interface SampleInterface {
  ...
}
```

请确保你的文档是符合规范的，否则你将无法通过这个任务。
