import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { IAINoContentFallback } from 'common/components/IAIImageFallback';
import ScrollableContent from 'features/nodes/components/sidePanel/ScrollableContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedMetadata } from 'services/api/hooks/useDebouncedMetadata';
import { useDebouncedWorkflow } from 'services/api/hooks/useDebouncedWorkflow';
import { ImageDTO } from 'services/api/types';
import DataViewer from './DataViewer';
import ImageMetadataActions from './ImageMetadataActions';

type ImageMetadataViewerProps = {
  image: ImageDTO;
};

const ImageMetadataViewer = ({ image }: ImageMetadataViewerProps) => {
  // TODO: fix hotkeys
  // const dispatch = useAppDispatch();
  // useHotkeys('esc', () => {
  //   dispatch(setShouldShowImageDetails(false));
  // });
  const { t } = useTranslation();

  const { metadata } = useDebouncedMetadata(image.image_name);
  const { workflow } = useDebouncedWorkflow(image.workflow_id);

  return (
    <Flex
      layerStyle="first"
      sx={{
        padding: 4,
        gap: 1,
        flexDirection: 'column',
        width: 'full',
        height: 'full',
        borderRadius: 'base',
        position: 'absolute',
        overflow: 'hidden',
      }}
    >
      <Flex gap={2}>
        <Text fontWeight="semibold">{t('common.file')}:</Text>
        <Link href={image.image_url} isExternal maxW="calc(100% - 3rem)">
          {image.image_name}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>

      <Tabs
        variant="line"
        sx={{
          display: 'flex',
          flexDir: 'column',
          w: 'full',
          h: 'full',
        }}
      >
        <TabList>
          <Tab>{t('metadata.recallParameters')}</Tab>
          <Tab>{t('metadata.metadata')}</Tab>
          <Tab>{t('metadata.imageDetails')}</Tab>
          <Tab>{t('metadata.workflow')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {metadata ? (
              <ScrollableContent>
                <ImageMetadataActions metadata={metadata} />
              </ScrollableContent>
            ) : (
              <IAINoContentFallback label={t('metadata.noRecallParameters')} />
            )}
          </TabPanel>
          <TabPanel>
            {metadata ? (
              <DataViewer data={metadata} label={t('metadata.metadata')} />
            ) : (
              <IAINoContentFallback label={t('metadata.noMetaData')} />
            )}
          </TabPanel>
          <TabPanel>
            {image ? (
              <DataViewer data={image} label={t('metadata.imageDetails')} />
            ) : (
              <IAINoContentFallback label={t('metadata.noImageDetails')} />
            )}
          </TabPanel>
          <TabPanel>
            {workflow ? (
              <DataViewer data={workflow} label={t('metadata.workflow')} />
            ) : (
              <IAINoContentFallback label={t('nodes.noWorkflow')} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default memo(ImageMetadataViewer);
