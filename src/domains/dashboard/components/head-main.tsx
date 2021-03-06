import { cond } from "ramda"
import React from "react"
import { ChartsMetadata } from "domains/global/types"
import { ChartWrapper } from "domains/dashboard/components/chart-wrapper"
import { Attributes } from "domains/chart/utils/transformDataAttributes"
import { mapDefaultAggrMethod } from "utils/fill-missing-data"

interface Props {
  getChart: (id: string) => any
  duration: number
  host: string
  nodeIDs: string[]
  commonAttributesOverrides?: Partial<Attributes>
  id?: string
}
export const HeadMain = ({
  getChart,
  duration,
  host,
  nodeIDs,
  commonAttributesOverrides,
  id,
}: Props) => {
  const commonAttributes = {
    host,
    forceTimeWindow: true,
    points: duration,
    nodeIDs,
    ...commonAttributesOverrides,
  }
  // todo
  const { colors } = window.NETDATA.themes.current

  return (
    <>
      {getChart("system.swap") && (
        <ChartWrapper
          attributes={{
            ...commonAttributes,
            id: "system.swap",
            appendOptions: "percentage",
            chartLibrary: "easypiechart",
            title: "Used Swap",
            easyPieChartMaxValue: 100,
            width: "9%",
            colors: "DD4400",
            dimensions: "used",
            units: "%",
            aggrMethod: mapDefaultAggrMethod("%"),
          }}
          style={{ marginRight: 10 }}
          chartMetadata={getChart("system.swap")}
          id={`system.swap-${id}`}
        />
      )}

      {getChart("system.io") ? (
        <>
          <ChartWrapper
            attributes={{
              ...commonAttributes,
              id: "system.io",
              dimensions: "in",
              chartLibrary: "easypiechart",
              title: "Disk Read",
              width: "11%",
              unitsCommon: "system.io.mainhead",
              aggrMethod: mapDefaultAggrMethod("kbps"),
            }}
            style={{ marginRight: 10 }}
            chartMetadata={getChart("system.io")}
            id={`system.io-in-${id}`}
          />
          <ChartWrapper
            attributes={{
              ...commonAttributes,
              id: "system.io",
              dimensions: "out",
              chartLibrary: "easypiechart",
              title: "Disk Write",
              width: "11%",
              unitsCommon: "system.io.mainhead",
              aggrMethod: mapDefaultAggrMethod("kbps"),
            }}
            style={{ marginRight: 10 }}
            chartMetadata={getChart("system.io")}
            id={`system.io-out-${id}`}
          />
        </>
      ) : (
        getChart("system.pgpgio") && (
          <>
            <ChartWrapper
              attributes={{
                ...commonAttributes,
                id: "system.pgpgio",
                dimensions: "in",
                chartLibrary: "easypiechart",
                title: "Disk Read",
                width: "11%",
                unitsCommon: "system.pgpgio.mainhead",
                aggrMethod: mapDefaultAggrMethod("KiB/s"),
              }}
              style={{ marginRight: 10 }}
              chartMetadata={getChart("system.pgpgio")}
              id={`system.pgpgio-in-${id}`}
            />
            <ChartWrapper
              attributes={{
                ...commonAttributes,
                id: "system.pgpgio",
                dimensions: "out",
                chartLibrary: "easypiechart",
                title: "Disk Write",
                width: "11%",
                unitsCommon: "system.pgpgio.mainhead",
                aggrMethod: mapDefaultAggrMethod("KiB/s"),
              }}
              style={{ marginRight: 10 }}
              chartMetadata={getChart("system.pgpgio")}
              id={`system.pgpgio-out-${id}`}
            />
          </>
        )
      )}

      {getChart("system.cpu") && (
        <ChartWrapper
          attributes={{
            ...commonAttributes,
            id: "system.cpu",
            chartLibrary: "gauge",
            title: "CPU",
            gaugeMaxValue: 100,
            width: "20%",
            colors: colors[12],
            unitsCommon: "system.pgpgio.mainhead",
            units: "%",
            aggrMethod: mapDefaultAggrMethod("%"),
          }}
          style={{ marginRight: 10 }}
          chartMetadata={getChart("system.cpu")}
          id={`system.cpu-${id}`}
        />
      )}

      {cond([
        [
          () => Boolean(getChart("system.net")),
          () => (
            <>
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.net",
                  dimensions: "received",
                  chartLibrary: "easypiechart",
                  title: "Net Inbound",
                  width: "11%",
                  unitsCommon: "system.net.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.net")}
                id={`system.net-received-${id}`}
              />
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.net",
                  dimensions: "sent",
                  chartLibrary: "easypiechart",
                  title: "Net Outbound",
                  width: "11%",
                  unitsCommon: "system.net.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.net")}
                id={`system.net-sent-${id}`}
              />
            </>
          ),
        ],
        [
          () => Boolean(getChart("system.ip")),
          () => (
            <>
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ip",
                  dimensions: "received",
                  chartLibrary: "easypiechart",
                  title: "IP Inbound",
                  width: "11%",
                  unitsCommon: "system.ip.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ip")}
                id={`system.ip-received-${id}`}
              />
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ip",
                  dimensions: "sent",
                  chartLibrary: "easypiechart",
                  title: "IP Outbound",
                  width: "11%",
                  unitsCommon: "system.ip.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ip")}
                id={`system.ip-sent-${id}`}
              />
            </>
          ),
        ],
        [
          () => Boolean(getChart("system.ipv4")),
          () => (
            <>
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ipv4",
                  dimensions: "received",
                  chartLibrary: "easypiechart",
                  title: "IPv4 Inbound",
                  width: "11%",
                  unitsCommon: "system.ipv4.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ipv4")}
                id={`system.ipv4-received-${id}`}
              />
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ipv4",
                  dimensions: "sent",
                  chartLibrary: "easypiechart",
                  title: "IPv4 Outbound",
                  width: "11%",
                  unitsCommon: "system.ipv4.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ipv4")}
                id={`system.ipv4-sent-${id}`}
              />
            </>
          ),
        ],
        [
          () => Boolean(getChart("system.ipv6")),
          () => (
            <>
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ipv6",
                  dimensions: "received",
                  chartLibrary: "easypiechart",
                  title: "IPv6 Inbound",
                  width: "11%",
                  unitsCommon: "system.ipv6.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ipv6")}
                id={`system.ipv6-received-${id}`}
              />
              <ChartWrapper
                attributes={{
                  ...commonAttributes,
                  id: "system.ipv6",
                  dimensions: "sent",
                  chartLibrary: "easypiechart",
                  title: "IPv6 Outbound",
                  width: "11%",
                  unitsCommon: "system.ipv6.mainhead",
                  aggrMethod: mapDefaultAggrMethod("kbps"),
                }}
                style={{ marginRight: 10 }}
                chartMetadata={getChart("system.ipv6")}
                id={`system.ipv6-sent-${id}`}
              />
            </>
          ),
        ],
      ])()}

      {getChart("system.ram") && (
        <ChartWrapper
          attributes={{
            ...commonAttributes,
            id: "system.ram",
            dimensions: "used|buffers|active|wired",
            appendOptions: "percentage",
            chartLibrary: "easypiechart",
            title: "Used RAM",
            easyPieChartMaxValue: 100,
            width: "9%",
            colors: colors[7],
            units: "%",
            aggrMethod: mapDefaultAggrMethod("%"),
          }}
          style={{ marginRight: 10 }}
          chartMetadata={getChart("system.ram")}
          id={`system.ram-${id}`}
        />
      )}
    </>
  )
}
