const DividendsCalendar = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">📅 Lịch Cổ Tức</h2>
      <iframe
        src="https://sslecal2.investing.com?ecoDayBackground=%23ffffff&cols=timestamp,actual,forecast,previous&culture=vi&type=dividends&timeFrame=thisWeek&market=us"
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <div className="poweredBy" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <span style={{ fontSize: '11px', color: '#333333', textDecoration: 'none' }}>
          Lịch Cổ Tức theo Thời Gian Thực được cung cấp bởi{' '}
          <a
            href="https://Investing.com/"
            rel="noreferrer"
            target="_blank"
            style={{ fontSize: '11px', color: '#06529D', fontWeight: 'bold' }}
            className="underline_link"
          >
            Investing.com
          </a>
        </span>
      </div>
    </div>
  )
}

export default DividendsCalendar
