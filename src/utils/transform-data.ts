import { Moment } from "moment";
const moment = require("moment");

export const handleTransformData = (data: any) => {
  const usersByCountry = groupUsersByCountry(data);
  console.log("usersByCounty", usersByCountry);
  const getDateOccurrences = getDates(usersByCountry);
  console.log("getDateOccurrences", getDateOccurrences);
  const getMostCommonAndEarliest = getA(getDateOccurrences);
  console.log("Get most: ", getMostCommonAndEarliest);
  const buildFinalObj = buildFinal(getMostCommonAndEarliest);
  console.log("final", buildFinalObj);
  return buildFinalObj.filter((d: any) => {
    return d;
  });
};

export const groupUsersByCountry = (data: any) => {
  const usersGroupedByCountry = data.reduce((acc: any, currVal: any) => {
    const foundCountry = acc.find((item: any) => {
      return item.country === currVal.country.toLowerCase();
    });

    if (foundCountry) {
      foundCountry.attendees.push(currVal);
      return [...acc];
    }

    return [
      ...acc,
      {
        country: currVal.country.toLowerCase(),
        attendees: [...(acc[currVal.country.toLowerCase()] || []), currVal],
      },
    ];
  }, []);

  return usersGroupedByCountry;
};

export const getDates = (usersByCountry: any) => {
  return usersByCountry.reduce((acc: any, currVal: any) => {
    const dates = currVal.attendees.flatMap((a: any) => {
      return a.availableDates;
    });
    const final = getFinal(dates);
    const updated = { ...currVal, dateData: final };
    return [...acc, updated];
  }, []);
};

export const getFinal = (dates: string[]) => {
  const final = dates.reduce((acc: any, currVal: any) => {
    const occ = dates.filter((v) => v === currVal).length;
    const isP = acc.find((i: any) => i.date === currVal);

    return !isP
      ? [
          ...acc,
          {
            date: currVal,
            occurrences: occ,
          },
        ]
      : [...acc];
  }, []);

  return final;
};

export const getA = (getDateOccurrences: any[]) => {
  const mostCommonDate = getDateOccurrences.map((countryInfo: any) => {
    const aCountriesBestDays = countryInfo.dateData.map((country: any) => {
      return country.occurrences;
    });
    const mostOccurring = Math.max(...aCountriesBestDays);

    const valuableDate = countryInfo.dateData.filter((d: any) => {
      return d.occurrences === mostOccurring;
    });

    if (valuableDate && valuableDate.length > 1)
      return { ...countryInfo, earliest: valuableDate[0] };

    const datesAsMoment: Moment[] = valuableDate.map((t: any) => {
      const d = new Date(t.date);
      const final = moment(d);
      return final;
    });
    const earliest = moment.min(datesAsMoment);

    return { ...countryInfo, earliest: earliest.format("YYYY-MM-DD") };
  });

  return mostCommonDate;
};

export const buildFinal = (data: any) => {
  const final = data.reduce((acc: any, currVal: any) => {
    const date = currVal.earliest.date;
    const attendees = currVal.attendees
      .filter((attendee: any) => {
        return includesDate(attendee, date);
      })
      .map((a: any) => {
        return a.email;
      });

    const data = {
      attendees,
      attendeeCount: attendees ? attendees.length : 0,
      name: currVal.country,
      startDate: date ? date : null,
    };

    return [...acc, data];
  }, []);

  return final;
};

const includesDate = (attendee: any, date: string) => {
  const f = attendee.availableDates.includes(date);
  return f;
};
