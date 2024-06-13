<template>
  <div class="container">
    SwymTimelineSeparatorUnreadMessage
    <SwymTimelineSeparatorUnreadMessage />
    SwymTimelineSeparatorDate (now)
    <SwymTimelineSeparatorDate :date="new Date(Date.now())" />
    SwymTimelineSeparatorDate (now - 1year)
    <SwymTimelineSeparatorDate :date="new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)" />
    SwymTimelineReply
    <SwymTimelineReply
      :author="{ firstName: 'Kevin', lastName: 'BEAUDOUIN', login: 'kbn1' }"
      text="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>"
    />
    SwymTimelineMessageBody
    <SwymTimelineMessageBody
      first
      text="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>"
    />
    <SwymTimelineMessageBody
      text="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>"
    >
      <SwymTimelineReply
        :author="{ firstName: 'Kevin', lastName: 'BEAUDOUIN', login: 'kbn1' }"
        text="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>"
      />
    </SwymTimelineMessageBody>
    SwymTimelineComment
    <SwymTimelineMessageBody
      type="idea"
      text="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        non ea dolorem odio optio! Ipsam corporis Ducimus non ea dolorem odio optio!</p>"
    />
    SwymTimelineAuthor
    <SwymTimelineAuthor
      :author="timeline[0].author"
      :date="new Date()"
    />
    TIMELINE
    <div class="timeline">
      <template
        v-for="(item, i) in timeline"
      >
        <SwymTimelineMessageBody
          v-if="item.message_type === 'INSTANT_MESSAGE'"
          :key="'message_' + item.message_id"
          :type="item.message_details.subject_model &&
            item.message_details.subject_model.toLowerCase()"
          :first="timeline[i + 1] && item.author.login !== timeline[i + 1].author.login"
          :text="item.message_details.content || item.message_details.model_content"
        >
          <SwymTimelineReply
            v-if="item.message_details.parent_message &&
              item.message_details.parent_message.message_id"
            :author="item.message_details.parent_message.author"
            :text=" item.message_details.parent_message.message_details.content"
          />
        </SwymTimelineMessageBody>
        <SwymTimelineAction
          v-if="item.message_type === 'INTERNAL_EVENT'"
          :key="'action_' + item.message_id"
          :type="item.message_details.model"
          :content="item.message_details"
          :base-url="`${item.community_type}:${item.community_id}`"
        />
        <SwymTimelineAuthor
          v-if="item.message_type === 'INTERNAL_EVENT' || !timeline[i + 1] || item.author.login !==
            timeline[i + 1].author.login"
          :key="'author_' + item.message_id"
          :author="item.author"
          :date="new Date(item.creation_date)"
        />
        <SwymTimelineSeparatorUnreadMessage
          v-if="i === 1"
          :key="'unread_' + item.message_id"
        />
        <SwymTimelineSeparatorDate
          v-if="!timeline[i + 1] || timeline[i + 1].creation_date.split('T')[0] !==
            item.creation_date.split('T')[0]"
          :key="'separator_' + item.message_id"
          :date="new Date(item.creation_date.split('T')[0])"
        />
      </template>
    </div>
  </div>
</template>

<script>
import timeline from '../assets/mocks/timeline.json';

export default {
  name: 'TimelineComponents',
  data: () => ({ timeline }),
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100vh;
  overflow: auto;

  .timeline {
    margin-left: 50px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
  }
}
</style>
