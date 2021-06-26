import React, { useRef } from 'react';
import { useRequest } from 'ahooks';
import { Helmet } from 'react-helmet';
import { getMatchInfo } from '@/services/sports';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import DownloadDialog from '@/components/DownloadDialog';
import RoomLayout from '@/components/RoomLayout';
import RenderJudge from '@/components/RenderJudge';
import FootballOverview from './components/FootballOverview';
import BasketballOverview from './components/BasketballOverview';
import HeaderMatchInfo from './components/HeaderMatchInfo';
import MatchIndex from './components/MatchIndex';

const ScoreDetailMain = ({ data }) => {
  const [matchId, , homeTeamName, awayTeamName, , , sportType] = data;
  const dialogRef = useRef();

  // 打开下载弹框
  const onOpenDownloadDialogHandle = () => dialogRef.current.open();

  return (
    <>
      <Helmet>
        <title>{`${homeTeamName} VS ${awayTeamName}`}</title>
        <meta name="keywords" content="足球直播,篮球直播,比赛直播" />
      </Helmet>
      <RoomLayout.Provider chatId={matchId}>
        {({ messages }) => (
          <RoomLayout
            player={(
              <HeaderMatchInfo data={data} />
            )}
            tabs={[{
              label: '赛况',
              component: (
                <>
                  <RenderJudge
                    value={sportType === 1}
                    active={(<FootballOverview data={data} />)}
                  />
                  <RenderJudge
                    value={sportType === 2}
                    active={(<BasketballOverview data={data} />)}
                  />
                </>
              )
            }, {
              label: '聊天',
              component: (<RoomLayout.Message
                list={messages}
                onMessage={onOpenDownloadDialogHandle}
                onGift={onOpenDownloadDialogHandle}
              />)
            }, {
              label: '指数',
              component: (<MatchIndex data={data} />)
            }]}
            showBack={false}
          />
        )}
      </RoomLayout.Provider>
      <DownloadDialog ref={dialogRef} />
    </>
  );
};

const ScoreDetailPage = ({ match: { params: { id } }, history }) => {
  const { data, loading } = useRequest(
    () => getMatchInfo({ match_id: id }),
    {
      initialData: [],
      defaultLoading: true,
      refreshDeps: [id]
    }
  );

  const onToastCloseHandle = () => history.replace('/score');

  if (loading) return (<Loading />);
  if (!data.length) return (<Toast visible text="页面不存在" duration={2000} onClose={onToastCloseHandle} />);
  return (<ScoreDetailMain data={data} />);
};

export default ScoreDetailPage;
