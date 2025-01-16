<script lang="ts">
  import { page } from "$app/state";
  import { PUBLIC_SLACK_CLIENT_ID } from "$env/static/public";
  const SLACK_AUTHORIZE_URL = `https://hackclub.slack.com/oauth/v2/authorize?scope=&user_scope=openid%2Cprofile%2Cemail&redirect_uri=${page.url.origin}/api/slack-callback&client_id=${PUBLIC_SLACK_CLIENT_ID}`;
</script>

<a href={SLACK_AUTHORIZE_URL}>
  <slot />
</a>
