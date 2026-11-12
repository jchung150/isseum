import { kakaoChannelUrl } from '../../config/site';

/** "on Naver TalkTalk or KakaoTalk". Drops KakaoTalk if the channel is switched off. */
export const channelPhrase = kakaoChannelUrl ? 'on Naver TalkTalk or KakaoTalk' : 'on Naver TalkTalk';

/** For quotes handled by hand (filming, long stays). */
export const askAnywhere = `${kakaoChannelUrl ? 'Naver TalkTalk, KakaoTalk' : 'Naver TalkTalk'}, phone or email`;
