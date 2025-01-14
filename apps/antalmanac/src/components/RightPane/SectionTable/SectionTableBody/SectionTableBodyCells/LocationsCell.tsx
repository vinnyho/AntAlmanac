import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { WebsocSectionMeeting } from '@packages/antalmanac-types';
import { Fragment, useCallback } from 'react';

import { MOBILE_BREAKPOINT } from '../../../../../globals';
import MapLink from '../../../../buttons/MapLink';

import { TableBodyCellContainer } from '$components/RightPane/SectionTable/SectionTableBody/SectionTableBodyCells/TableBodyCellContainer';
import locationIds from '$lib/location_ids';
import { useThemeStore } from '$stores/SettingsStore';
import { useTabStore } from '$stores/TabStore';

interface LocationsCellProps {
    meetings: WebsocSectionMeeting[];
    courseName: string;
}

export const LocationsCell = ({ meetings }: LocationsCellProps) => {
    const isDark = useThemeStore((store) => store.isDark);
    const { setActiveTab } = useTabStore();
    const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT})`);

    const focusMap = useCallback(() => {
        setActiveTab(isMobileScreen ? 3 : 2);
    }, [setActiveTab]);

    return (
        <TableBodyCellContainer>
            {meetings.map((meeting) => {
                return !meeting.timeIsTBA ? (
                    meeting.bldg.map((bldg) => {
                        const [buildingName = ''] = bldg.split(' ');
                        const buildingId = locationIds[buildingName];
                        return (
                            <Fragment key={meeting.timeIsTBA + bldg}>
                                <MapLink
                                    buildingId={buildingId}
                                    buildingName={bldg}
                                    focusMap={focusMap}
                                    isDark={isDark}
                                />
                                <br />
                            </Fragment>
                        );
                    })
                ) : (
                    <Box>{'TBA'}</Box>
                );
            })}
        </TableBodyCellContainer>
    );
};
